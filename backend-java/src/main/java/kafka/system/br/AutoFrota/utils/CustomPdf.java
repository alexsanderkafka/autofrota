package kafka.system.br.AutoFrota.utils;

import java.io.ByteArrayOutputStream;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;

import kafka.system.br.AutoFrota.dto.VehicleExpenseDTO;
import kafka.system.br.AutoFrota.exception.ErrorToCreatePdfException;
import kafka.system.br.AutoFrota.model.Fuel;
import kafka.system.br.AutoFrota.model.Maintenance;
import kafka.system.br.AutoFrota.model.Vehicle;

public abstract class CustomPdf {

    public static byte[] generateCompanyPdf(List<VehicleExpenseDTO> vehicles, String companyName){
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()){
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdfDoc = new PdfDocument(writer);
            Document document = new Document(pdfDoc);

            // Título
            document.add(new Paragraph(companyName.toUpperCase()).setBold().setFontSize(18));
            document.add(new Paragraph("Relatório de Gastos da Frota\n\n").setFontSize(14));

            // Cabeçalho da Tabela
            float[] colWidths = {300F, 100F, 150F};
            Table table = new Table(colWidths);
            table.addHeaderCell("Veículo");
            table.addHeaderCell("Placa");
            table.addHeaderCell("Valor Gasto (R$)");

            Double total = 0.0;

            for(VehicleExpenseDTO vehicle : vehicles){
                table.addCell(vehicle.vehicle().getBrand() + " " + vehicle.vehicle().getModel());
                table.addCell(vehicle.vehicle().getPlate());
                String expenseFormatted = String.format("%.2f", vehicle.expense());
                total += vehicle.expense();
                table.addCell("R$ " + expenseFormatted);    
            }

            document.add(table);

            // Valor Total
            String totalFormatted = String.format("%.2f", total);
            document.add(new Paragraph("\nValor Total da Frota: R$ " + totalFormatted).setBold());

            // Rodapé com data
            document.add(new Paragraph("\nPágina 1 - Gerado em " + LocalDate.now()));

            document.close();

            return baos.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            throw new ErrorToCreatePdfException("Não foi possível gerar o PDF");
        }
    }
    
    public static byte[] generateVehiclePdf(String companyName, List<Maintenance> maintenances, List<Fuel> fuels, Vehicle vehicle){
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream()){
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdfDoc = new PdfDocument(writer);
            Document document = new Document(pdfDoc);

            // Título
            document.add(new Paragraph(companyName.toUpperCase()).setBold().setFontSize(18));
            document.add(new Paragraph("Relatório de Gastos do veículo: ").setFontSize(14));
            document.add(new Paragraph("Marca: " + vehicle.getBrand()).setFontSize(12));
            document.add(new Paragraph("Modelo: " + vehicle.getModel()).setFontSize(12));
            document.add(new Paragraph("Placa: " + vehicle.getPlate() + "\n\n").setFontSize(12));


            document.add(new Paragraph("Gastos com manutenções: ").setBold().setFontSize(14));

            float[] colWidths = {300F, 150F};

            // Tabela de manutenções
            Table maintenanceTable = new Table(colWidths);
            maintenanceTable.addHeaderCell("Data da manutenção");
            maintenanceTable.addHeaderCell("Valor Gasto (R$)");

            Double totalMaintenance = 0.0;

            SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy", Locale.forLanguageTag("pt-BR"));


            for(Maintenance maintenance : maintenances){
                maintenanceTable.addCell(sdf.format(maintenance.getDate()));
                String expenseFormatted = String.format("%.2f", maintenance.getTotalValue());
                maintenanceTable.addCell("R$ " + expenseFormatted);    

                totalMaintenance += maintenance.getTotalValue();
            }
            document.add(maintenanceTable);

            document.add(new Paragraph("\n\nGastos com abastecimentos: ").setBold().setFontSize(14));

            Double totalFuel = 0.0;

            // Tabela de abastecimentos
            Table fuelTable = new Table(colWidths);
            fuelTable.addHeaderCell("Data do abastecimento");
            fuelTable.addHeaderCell("Valor Gasto (R$)");
            for(Fuel fuel : fuels){
                fuelTable.addCell(sdf.format(fuel.getDate()));
                String expenseFormatted = String.format("%.2f", fuel.getTotalValue());
                fuelTable.addCell("R$ " + expenseFormatted);    

                totalFuel += fuel.getTotalValue();
            }

            document.add(fuelTable);

            // Valor Total
            Double total = totalMaintenance + totalFuel;
            String totalFormatted = String.format("%.2f", total);
            String totalFuelFormatted = String.format("%.2f", totalFuel);
            String totalMaintenanceFormatted = String.format("%.2f", totalMaintenance);
            document.add(new Paragraph("\nTotal gasto com abastecimentos: R$ " + totalFuelFormatted).setBold());
            document.add(new Paragraph("Total gasto com manutenções: R$ " + totalMaintenanceFormatted).setBold());
            document.add(new Paragraph("Total gastos: R$ " + totalFormatted).setBold());

            // Rodapé com data
            document.add(new Paragraph("\nGerado em " + sdf.format(new Date())));

            document.close();

            return baos.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            throw new ErrorToCreatePdfException("Não foi possível gerar o PDF");
        }
    }
}
