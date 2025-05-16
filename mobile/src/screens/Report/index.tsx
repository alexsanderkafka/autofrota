import React, { useState, useEffect, useRef} from 'react';
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
  } from 'react-native';
  
import { colors } from '../../theme';

import FilterButton from '../../components/FilterButton';
import InfoCardReport from '../../components/infoCardReport';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
import useReport from '../../hooks/useReport';

//Gráfico
import { CartesianChart, Line, Bar, useChartPressState, BarGroup, useBarGroupPaths, type PointsArray, type ChartBounds, useChartTransformState, } from 'victory-native';
import Animated, { useAnimatedProps, SharedValue} from 'react-native-reanimated';
import { Circle, useFont, vec, LinearGradient, Path} from '@shopify/react-native-skia';
import { Roboto_100Thin, Roboto_400Regular } from '@expo-google-fonts/roboto';

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


    const { state, isActive} = useChartPressState<any>({x: "Jan", y: {fuel: 40000, maintenance: 2000}})
    const font = useFont(Roboto_400Regular, 12);
    const transformState = useChartTransformState({
        scaleX: 1.5, // Initial X-axis scale
        scaleY: 1.0, // Initial Y-axis scale
    });

    
    const { report } = useReport();
    console.log(report);
    const totalVehicles: number = report ? report!.totalVehicles : 0;
    const totalKm: number = report ? report!.totalKm : 0;
    const totalExpenseFuel: number = report ? report!.totalExpenseFuel : 0;
    const totalExpenseMaintenance: number = report ? report!.totalExpenseMaintenance : 0;

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

    type ReportData = {
        month: string;
        fuel: number;
        maintenance: number;
    };

    const data: ReportData[] = [
    { 
        month: 'Jan',
        fuel: 5000,
        maintenance: 15000
    },
    { 
        month: 'Fev',
        fuel: 23000,
        maintenance: 5000
    },
    { 
        month: 'Mar',
        fuel: 900,
        maintenance: 5000
        
    },
    { 
        month: 'Abr',
        fuel: 8000,
        maintenance: 5000
    },
    {   month: 'Mai',
        fuel: 6000,
        maintenance: 400
    },
    { 
        month: 'Jun',
        fuel: 3000,
        maintenance: 0
    },
    { 
        month: 'Jul',
        fuel: 13000,
        maintenance: 100
    },
    { 
        month: 'Ago',
        fuel: 19000,
        maintenance: 1000
    },
    {   
        month: 'Set',
        fuel: 4000 ,
        maintenance: 1000
    },
    { 
        month: 'Out',
        fuel: 5000 ,
        maintenance: 0
    },
    { 
        month: 'Nov',
        fuel: 5500 ,
        maintenance: 0
    },
    { 
        month: 'Dez',
        fuel: 7000 ,
        maintenance: 2000
    }    
    ];


    return(
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.filterButtonContainer}>
                    <FilterButton text="Frota"/>
                    <FilterButton text="Manutenção"/>
                    <FilterButton text="Combustível"/>
                </View>

                <View style={styles.containerVehiclesInfos}>
                    <InfoCardReport icon="car" color={colors.icon.mainBlue} amount={totalVehicles.toString()} title="Veículos"/>
                    <InfoCardReport icon="car" color={colors.icon.secondaray} amount={`${totalKm} Km`} title="Km rodados"/>
                    <InfoCardReport icon="currency-usd" color={colors.icon.money} amount={`R$ ${totalExpenseFuel.toFixed(2)}`} title="Gastos"/>
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

                    {
                        !isActive && (
                            <View>
                                <Text style={styles.valueChart}>R$ {data[data.length - 1].fuel}</Text>
                                <Text style={styles.dataChart}>{data[data.length - 1].month}</Text>
                            </View>
                        )
                    }

                   <View style={styles.chart}>
                    <CartesianChart<ReportData, 'month', 'fuel' | 'maintenance'>
                        data={data}
                        xKey="month"
                        yKeys={["fuel", "maintenance"]}
                        transformConfig={{
                            pan: {
                                activateAfterLongPress: 100, // Delay in ms before pan gesture activates
                            },
                        }}
                        axisOptions={{
                            tickCount: data.length / 2,
                            font: font,
                            labelOffset: { x: 3, y: 2},
                            labelPosition: 'outset',
                        }}
                    >
                         {({ points, chartBounds }: any) => {

                            const maxValue: PointsArray = points.fuel > points.maintenance ? points.maintenance : points.fuel;
                            
                            return (
                            <ScrollView
                            horizontal={true}
                            >
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
                                    <BarGroup.Bar points={points.fuel} color="#2563EB" />
                                    <BarGroup.Bar points={points.maintenance} color="#FFA500" />
                                </BarGroup>
                                {
                                    isActive && (
                                        <ToolTip x={state.x.position} y={state.y.fuel.position}/>
                                    )
                                }
                            </ScrollView>)
                            
                         }}
                    </CartesianChart>
                   </View> 
                    
                </View>

                <View style={styles.reportContainer}>
                    <Text style={styles.title}>Geração de relatório</Text>

                    <TouchableOpacity style={styles.reportButton}>
                        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center'}}>
                            <Image source={require('../../../assets/icons/pdf.png')} style={{width: 38, height: 38}}/>
                            <Text>Relatório em pdf</Text>
                        </View>
                        <Icon name="cloud-download" size={24} color={colors.icon.main}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.reportButton}>
                        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center'}}>
                            <Image source={require('../../../assets/icons/docx.png')} style={{width: 38, height: 38}}/>
                            <Text>Relatório em pdf</Text>
                        </View>
                        <Icon name="cloud-download" size={24} color={colors.icon.main}/>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}