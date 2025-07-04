import React, { useState, useEffect, useRef, use, useMemo} from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    ActivityIndicator,
    ScrollView,
    TouchableOpacity,
    Image,
    TextInput,
    Dimensions,
    Modal
  } from 'react-native';
  
import { colors } from '../../theme';

import FilterButton from '../../components/FilterButton';
import InfoCardReport from '../../components/infoCardReport';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
import useReport from '../../hooks/useReport';
import useReportHistory from '../../hooks/useReportHistory';

//Gráfico
import { CartesianChart, Line, Bar, useChartPressState, BarGroup, useBarGroupPaths, type PointsArray, type ChartBounds, useChartTransformState, } from 'victory-native';
import Animated, { useAnimatedProps, SharedValue} from 'react-native-reanimated';
import { Circle, useFont, vec, LinearGradient, Path} from '@shopify/react-native-skia';
import { Roboto_100Thin, Roboto_400Regular } from '@expo-google-fonts/roboto';
import ChartSelect from '../../components/ChartSelect';

import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import ReportHistory from '../../types/reportHistory';
import Storage from '../../utils/storage';
import { getHistoryByYear, getHistoryCompanyPdf } from '../../service/reportService';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

import * as Sharing from 'expo-sharing';
import YearSelectorModal from '../../modal/YearSelectorModal';

Animated.addWhitelistedNativeProps({ text: true });
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color="black" />;
}

function MyCustomBarGroup({ points, chartBounds }: {points: PointsArray[]; chartBounds: ChartBounds;}) {
  // 👇 use the hook to generate path objects.
  const { paths } = useBarGroupPaths(points, chartBounds);

  return paths.map((path) => <Path path={path} style="fill" color="red" />);
}

type ChartTransformStateConfig = {
  scaleX?: number; // Initial X-axis scale
  scaleY?: number; // Initial Y-axis scale
};

export default function ReportScreen(){

    const [tokenJwt, setTokenJwt] = useState<string>();
    const [companyId, setCompanyId] = useState<string>();
    const [loadingReport, setLoadingReport] = useState<boolean>(false);

    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const { state, isActive} = useChartPressState<any>({x: "Jan", y: {fuel: 40000, maintenance: 2000}})
    const font = useFont(Roboto_400Regular, 12);
    const transformState = useChartTransformState({
        scaleX: 1.5, // Initial X-axis scale
        scaleY: 1.0, // Initial Y-axis scale
    });
    
    const { report } = useReport();
    const totalVehicles: number = report ? report!.totalVehicles : 0;
    const totalKm: number = report ? report!.totalKm : 0;
    const totalExpenseFuel: number = report ? report!.totalExpenseFuel : 0;
    const totalExpenseMaintenance: number = report ? report!.totalExpenseMaintenance : 0;

    const [reportHistory, setReportHistory] = useState<ReportHistory[] | null | undefined >(null);
    const [normalizedReport, setNormalizedReport] = useState<any>(null);


    //Select data
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

    useEffect(() => {
        getReport();
    }, [selectedYear])

    //url pdf
    const [urlPdf, setUrlPdf] = useState<string | null>();

    useEffect(() => {        
        getReport();
    }, []);

    useEffect(() => {
        const currentReport: ReportHistory[] = monthNames.map((name, index) => {
            const monthNumber = (index + 1).toString();
            const found = reportHistory?.find(item => item.month === monthNumber);
        
            return {
                month: name,
                totalExpenseFuel: found?.totalExpenseFuel ?? 0,
                totalExpenseMaintenance: found?.totalExpenseMaintenance ?? 0,
            };
        });

        setNormalizedReport(currentReport);
        console.log(currentReport);
    }, [reportHistory])



    async function getReport() {
        console.log("Bateu em getReport");
        const report: ReportHistory[] | null | undefined = await getHistoryByYear(selectedYear);


        
        console.log("get Report:", report);

        setReportHistory(report);
    }

    const animatedPriceText: any = useAnimatedProps(() => {
        return {
            text: `R$ ${state.y.fuel.value.value.toFixed(2)}`,
            default: ""
        }
    });

    const animatedDataText: any = useAnimatedProps(() => {
        return {
            text: `${state.x.value.value}`,
        }
    });

    //filter
    const [selectedFilter, setSelectedFilter] = useState('Frota');
    const filters = ['Frota', 'Manutenção', 'Combustível'];

    const [datePicker, setDatePicker] = useState<Date>(new Date());
    const [showPicker, setShowPicker] = useState<boolean>(false);
    
    const onChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || datePicker;
        //const year = currentDate.getFullYear();
        //setSelectedData(year);
        setShowPicker(Platform.OS === 'ios'); // no iOS ele fica aberto, no Android fecha
        setDatePicker(currentDate);
    };


    type ChartSelectProps = {
        month: string;
        totalExpenseFuel: number;
        totalExpenseMaintenance: number;
    }   

    function renderTotalExpense(){
        if(selectedFilter === 'Manutenção') return totalExpenseMaintenance.toFixed(2);

        if(selectedFilter === 'Combustível') return totalExpenseFuel.toFixed(2);

        return (totalExpenseFuel + totalExpenseMaintenance).toFixed(2);
    }

    async function getPdf(){
        setLoadingReport(true);
        const response = getHistoryCompanyPdf().then(async (res) => {
            setUrlPdf(res)
            await openPdf(res!);
        });
    }

    async function openPdf(path: string){
        if (await Sharing.isAvailableAsync()) {
            setLoadingReport(false);
            await Sharing.shareAsync(path);
        } else {
            console.log("ERror ao abrir o pdf")
        }

        return;
    }

    return(
            <View style={styles.container}>
                <ScrollView style={styles.scrollView}>

                <View style={styles.containerVehiclesInfos}>
                    <InfoCardReport icon="car" color={colors.icon.mainBlue} amount={totalVehicles.toString()} title="Veículos"/>
                    <InfoCardReport icon="car" color={colors.icon.secondaray} amount={`${!totalKm ? 0 : totalKm} Km`} title="Km rodados"/>
                    <InfoCardReport icon="currency-usd" color={colors.icon.money} amount={`R$ ${renderTotalExpense()}`} title="Gastos"/>
                </View>

                <View style={styles.chartContainer}>
                    {
                        isActive && (
                            <View>
                                <AnimatedTextInput
                                editable={false}
                                underlineColorAndroid={"transparent"}
                                style={styles.valueChart}
                                animatedProps={animatedPriceText}
                                ></AnimatedTextInput>

                                <AnimatedTextInput
                                editable={false}
                                underlineColorAndroid={"transparent"}
                                style={styles.dataChart}
                                animatedProps={animatedDataText}
                                ></AnimatedTextInput>
                            </View>
                        )
                    }

                    <View style={styles.chartHeader}>
                        {
                            isActive && reportHistory ? (
                                <View>
                                    <Text style={styles.valueChart}>R$ {reportHistory[reportHistory.length - 1].totalExpenseFuel}</Text>
                                    <Text style={styles.dataChart}>{reportHistory[reportHistory.length - 1].month}</Text>
                                </View>
                            ) : (
                                <Text style={styles.titleChart}>Desempenho</Text>
                            )
                        }

                        <YearSelectorModal
                            selectedYear={selectedYear}
                            onSelectYear={setSelectedYear}
                        />
                    </View>
                    
                   <View style={styles.chart}>
                    {
                        reportHistory ? ( 
                            <CartesianChart<ChartSelectProps, 'month', 'totalExpenseFuel' | 'totalExpenseMaintenance'>
                            key={`chart-${selectedYear}`}
                            data={normalizedReport}
                            xKey="month"
                            yKeys={["totalExpenseFuel", "totalExpenseMaintenance"]}
                            transformConfig={{
                                pan: {
                                    activateAfterLongPress: 100, // Delay in ms before pan gesture activates
                                },
                            }}
                            axisOptions={{
                                tickCount: 10,
                                font: font,
                                labelOffset: { x: 1, y: 10},
                                labelPosition: 'outset',
                            }}
                            >
                            {({ points, chartBounds }: any) => {

                                const maxValue: PointsArray = points.totalExpenseFuel > points.totalExpenseMaintenance ? points.totalExpenseMaintenance : points.totalExpenseFuel;
                            
                                return (
                                    <>
                                        <Line
                                        points={maxValue}
                                        color="#7B7C67"
                                        strokeWidth={3}
                                        animate={{ type: "timing", duration: 300 }}
                                        />

                                        <BarGroup
                                            chartBounds={chartBounds}
                                            betweenGroupPadding={0.3}
                                            withinGroupPadding={0.2}
                                        >
                                            <BarGroup.Bar points={points.totalExpenseFuel} color="#2563EB" />
                                            <BarGroup.Bar points={points.totalExpenseMaintenance} color="#FFA500" />
                                        </BarGroup>
                                        {
                                            isActive && (
                                                <ToolTip x={state.x.position} y={state.y.totalExpenseFuel.position}/>
                                            )
                                        }
                                    </>
                                )
                            }}
                            </CartesianChart>
                        ) : (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <ActivityIndicator size="large" color={colors.primary.main}/>
                            </View>
                        )
                    }
                   </View> 

                   <View style={styles.chartLegend}>
                        <View style={styles.legendItem}>
                            <View style={[styles.identification, {backgroundColor: '#2563EB', borderRadius: 5}]}/>
                            <Text>Combustível</Text>
                        </View>

                        <View style={styles.legendItem}>
                            <View style={[styles.identification, {backgroundColor: '#FFA500', borderRadius: 5}]}/>
                            <Text>Manutenções</Text>
                        </View>

                        <View style={styles.legendItem}>
                            <View style={[styles.identification, {backgroundColor: '#7B7C67', borderRadius: 5}]}/>
                            <Text>Pico de gastos</Text>
                        </View>
                        

                   </View>
                    
                </View>

                {showPicker && (
                    <DateTimePicker
                    value={datePicker}
                    mode="datetime"
                    display="default"
                    style={{ backgroundColor: colors.primary.main }}
                    onChange={onChange}
                    />
                )}

                <View style={styles.reportContainer}>
                    <Text style={styles.title}>Geração de relatório</Text>

                    <TouchableOpacity style={styles.reportButton}
                    onPress={getPdf}
                    >   
                        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center'}}>
                            <Image source={require('../../assets/images/icons/pdf.png')} style={{width: 38, height: 38}}/>
                            <Text>Relatório em pdf</Text>
                        </View>
                        {
                            loadingReport ? (
                                <ActivityIndicator size="small" color={colors.icon.mainBlue}/>
                            ) : (
                                <Icon name="cloud-download" size={24} color={colors.icon.main}/> 
                            )
                        } 
                    </TouchableOpacity>
                </View>
                </ScrollView>
            </View>
    );
}