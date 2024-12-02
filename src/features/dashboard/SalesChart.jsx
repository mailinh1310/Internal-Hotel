/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx"; // Import thư viện Excel
import {
  AlignmentType,
  Document,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { vi } from "date-fns/locale";
import Button from "../../ui/Button";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.6rem;
`;

function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });
  // console.log(allDates);

  // Hàm tính toán dữ liệu
  function calculateReportData(data) {
    const startDate = data[0].label; // Ngày đầu tiên
    const endDate = data[data.length - 1].label; // Ngày cuối cùng

    let totalSales = 0;
    let roomSales = 0;
    let extraSales = 0;

    data.forEach((item) => {
      totalSales += item.totalSales + item.extrasSales;
      roomSales += item.totalSales;
      extraSales += item.extrasSales;
    });

    return {
      startDate,
      endDate,
      totalSales,
      roomSales,
      extraSales,
    };
  }

  function handleExport(data, dataCaculated) {
    const { startDate, endDate, totalSales, roomSales, extraSales } =
      dataCaculated;
    const currentDate = new Intl.DateTimeFormat("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(new Date());

    // Tạo báo cáo dạng Word
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER, // Căn giữa văn bản
              spacing: {
                after: 200, // Giãn cách đoạn sau (200 twips, khoảng 0.14 inch)
              },
              children: [
                new TextRun({
                  text: "BÁO CÁO DOANH THU",
                  bold: true,
                  size: 32, // Kích thước chữ 16pt
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 100,
              },
              children: [
                new TextRun({
                  text: `Thời gian: Từ ${startDate} đến ${endDate}`,
                  size: 28,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              alignment: AlignmentType.CENTER,
              spacing: {
                after: 200, // Giãn cách đoạn sau (200 twips, khoảng 0.14 inch
              },
              children: [
                new TextRun({
                  text: "Đơn vị: Luxury Forest Hotel",
                  size: 28,
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              spacing: {
                line: 360, // Giãn cách dòng (khoảng cách 360 twips, khoảng 0.25 inch)
                after: 200, // Giãn cách đoạn sau (200 twips, khoảng 0.14 inch)
              },
              children: [
                new TextRun({
                  text: "1. Tổng quan doanh thu",
                  bold: true,
                  size: 24,
                }),
              ],
            }),
            new Table({
              // columnWidths: [5000, 4000],
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      width: {
                        size: 5000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: "Tiêu chí",
                              size: 24,
                              bold: true,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      width: {
                        size: 5000,
                        type: WidthType.DXA,
                      },
                      children: [
                        new Paragraph({
                          alignment: AlignmentType.CENTER,
                          children: [
                            new TextRun({
                              text: "Giá trị (USD)",
                              size: 24,
                              bold: true,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Tổng doanh thu",
                              size: 24,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: totalSales.toFixed(2),
                              size: 24,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Doanh thu từ phòng",
                              size: 24,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: roomSales.toFixed(2),
                              size: 24,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: "Doanh thu từ dịch vụ",
                              size: 24,
                            }),
                          ],
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          children: [
                            new TextRun({
                              text: extraSales.toFixed(2),
                              size: 24,
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            new Paragraph({
              // alignment: AlignmentType.CENTER,
              spacing: {
                line: 360, // Giãn cách dòng (khoảng cách 360 twips, khoảng 0.25 inch)
                after: 200, // Giãn cách đoạn sau (200 twips, khoảng 0.14 inch)
              },
              children: [
                new TextRun({
                  text: "________________________________________________________________",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: "2. Biểu đồ doanh thu",
                  bold: true,
                  size: 24,
                }),
              ],
            }),
            new Paragraph({
              bullet: {
                level: 0,
              },
              children: [
                new TextRun({
                  text: "Loại biểu đồ",
                  size: 24,
                  bold: true,
                }),
                new TextRun({
                  text: ": Biểu đồ đường.",
                  size: 24,
                }),
              ],
            }),
            new Paragraph({
              bullet: {
                level: 0,
              },
              children: [
                new TextRun({
                  text: "Mô tả",
                  size: 24,
                  bold: true,
                }),
                new TextRun({
                  text: ": Hiển thị doanh thu hàng ngày trong 90 ngày gần nhất.",
                  size: 24,
                }),
              ],
            }),
            new Paragraph({
              // alignment: AlignmentType.CENTER,
              spacing: {
                line: 360, // Giãn cách dòng (khoảng cách 360 twips, khoảng 0.25 inch)
                after: 200, // Giãn cách đoạn sau (200 twips, khoảng 0.14 inch)
              },
              children: [
                new TextRun({
                  text: "________________________________________________________________",
                  size: 28,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Ngày lập báo cáo`,
                  size: 24,
                  bold: true,
                }),
                new TextRun({
                  text: `: ${currentDate}`,
                  size: 24,
                }),
              ],
            }),
          ],
        },
      ],
    });

    // Tạo báo cáo Excel
    const wb = XLSX.utils.book_new();
    const wsData = [
      [
        "Ngày",
        "Doanh thu từ phòng (USD)",
        "Doanh thu từ dịch vụ (USD)",
        "Tổng doanh thu (USD)",
      ],
      ...data.map((dayData) => [
        dayData.label,
        dayData.totalSales.toFixed(2),
        dayData.extrasSales.toFixed(2),
        (dayData.totalSales + dayData.extrasSales).toFixed(2),
      ]),
      // Cộng thêm dòng tổng doanh thu từ phòng và dịch vụ
      [
        "Tổng cộng",
        roomSales.toFixed(2),
        extraSales.toFixed(2),
        totalSales.toFixed(2),
      ],
    ];

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Doanh Thu");

    // Xuất báo cáo word
    Packer.toBlob(doc).then((blob) => {
      saveAs(blob, "BaoCaoDoanhThu.docx");
      console.log("Document created successfully");
    });

    // Xuất báo cáo Excel
    XLSX.writeFile(wb, "BaoCaoDoanhThu.xlsx");
    console.log("Excel report created successfully");
  }

  const data = allDates.map((date) => {
    return {
      label: format(date, "dd/MM/yyyy", { locale: vi }),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });
  console.log(data);

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extrasSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extrasSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <TitleContainer>
        <Heading as="h2">
          Doanh thu từ {format(allDates.at(0), "dd/MM/yyyy", { locale: vi })}{" "}
          &mdash; {format(allDates.at(-1), "dd/MM/yyyy", { locale: vi })}
        </Heading>
        <Button
          onClick={() => {
            console.log("Xuất báo cáo");
            handleExport(data, calculateReportData(data));
          }}
        >
          Xuất báo cáo
        </Button>
      </TitleContainer>

      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            unit="$"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Tổng doanh thu"
            unit="$"
          />
          <Area
            dataKey="extrasSales"
            type="monotone"
            stroke={colors.extrasSales.stroke}
            fill={colors.extrasSales.fill}
            strokeWidth={2}
            name="Doanh thu phụ"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
