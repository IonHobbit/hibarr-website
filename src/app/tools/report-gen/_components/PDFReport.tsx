import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

// Type Definitions

type DayData = {
  date: string;
  totalMinutes: number;
  hours: number;
  minutes: number;
  clockIn?: string;
  clockOut?: string;
  isLate: boolean;
  note: string;
};

type WeeklySummary = {
  week: number;
  hoursWorked: string;
  expectedHours: string;
  difference: string;
  totalMinutesWorked: number;
  totalMinutesExpected: number;
  totalMinutesDifference: number;
};

type EmployeeSummary = {
  totalHoursWorked: string;
  totalDaysWorked: number;
  averageHoursPerDay: string;
  dayWithMostHours: {
    date: string;
    hours: string;
  };
  dayWithLeastHours: {
    date: string;
    hours: string;
  };
};

type PunctualityData = {
  lateDays: number;
  latePercentage: string;
  averageStartTime: string;
  averageEndTime: string;
};

type WeeklyTotals = {
  hoursWorked: string;
  expectedHours: string;
  difference: string;
};

type ReportData = {
  employeeName: string;
  hoursPerWeek: number;
  summary: EmployeeSummary;
  punctuality: PunctualityData;
  weeklyData: WeeklySummary[];
  dailyData: DayData[];
  chartData: Array<{
    date: string;
    hoursWorked: number;
  }>;
  weeklyTotals: WeeklyTotals;
};

const styles = StyleSheet.create({
  page: {
    padding: 30,
    backgroundColor: '#ffffff'
  },
  header: {
    marginBottom: 20,
    borderBottom: '1 solid #ccc',
    paddingBottom: 10
  },
  title: {
    fontSize: 24,
    marginBottom: 10
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    padding: 5
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5
  },
  label: {
    width: '40%',
    fontSize: 12
  },
  value: {
    width: '60%',
    fontSize: 12
  },
  table: {
    display: 'flex',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginBottom: 10
  },
  tableRow: {
    flexDirection: 'row'
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 5
  },
  tableCell: {
    fontSize: 10
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#666'
  },
  analysis: {
    marginBottom: 10,
    fontSize: 12,
    lineHeight: 1.5
  },
  recommendations: {
    marginTop: 10
  },
  recommendationItem: {
    fontSize: 12,
    marginBottom: 5,
    paddingLeft: 10
  }
});

export const generatePDF = async (report: ReportData) => {
  const blob = await pdf(
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Work Report</Text>
          <Text style={styles.subtitle}>{report.employeeName}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I. Employee Performance Summary</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Total Hours Worked:</Text>
            <Text style={styles.value}>{report.summary.totalHoursWorked}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total Days Worked:</Text>
            <Text style={styles.value}>{report.summary.totalDaysWorked}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Average Hours Per Day:</Text>
            <Text style={styles.value}>{report.summary.averageHoursPerDay}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Day with Most Hours:</Text>
            <Text style={styles.value}>
              {report.summary.dayWithMostHours.date} ({report.summary.dayWithMostHours.hours})
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Day with Least Hours:</Text>
            <Text style={styles.value}>
              {report.summary.dayWithLeastHours.date} ({report.summary.dayWithLeastHours.hours})
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>II. Punctuality Analysis</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Late Days:</Text>
            <Text style={styles.value}>{report.punctuality.lateDays}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Late Percentage:</Text>
            <Text style={styles.value}>{report.punctuality.latePercentage}%</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Average Start Time:</Text>
            <Text style={styles.value}>{report.punctuality.averageStartTime}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Average End Time:</Text>
            <Text style={styles.value}>{report.punctuality.averageEndTime}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>III. Weekly Hours Analysis</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Week</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Hours Worked</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Expected Hours</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Difference</Text>
              </View>
            </View>
            {report.weeklyData.map((week: WeeklySummary, index: number) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>Week {week.week}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{week.hoursWorked}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{week.expectedHours}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{week.difference}</Text>
                </View>
              </View>
            ))}
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Total</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{report.weeklyTotals.hoursWorked}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{report.weeklyTotals.expectedHours}</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{report.weeklyTotals.difference}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>IV. Daily Work Log</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Date</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Hours Worked</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Clock-In</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>Clock-Out</Text>
              </View>
            </View>
            {report.dailyData.map((day: DayData, index: number) => (
              <View key={index} style={styles.tableRow}>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{day.date}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{day.hours}h {day.minutes}m</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{day.clockIn || '-'}</Text>
                </View>
                <View style={styles.tableCol}>
                  <Text style={styles.tableCell}>{day.clockOut || '-'}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>V. Work Pattern Analysis and Recommendations</Text>
          
          <View style={styles.analysis}>
            <Text>
              The employee worked a total of {report.summary.totalHoursWorked} hours over {report.summary.totalDaysWorked} days,
              with an average of {report.summary.averageHoursPerDay} hours per working day.
              {report.punctuality.lateDays > 0
                ? ` They arrived late (after 9:05 AM) on ${report.punctuality.lateDays} days (${report.punctuality.latePercentage}% of workdays).`
                : ' They have excellent punctuality with no late arrivals.'}
              {' '}The average start time is {report.punctuality.averageStartTime} and end time is {report.punctuality.averageEndTime}.
            </Text>
          </View>

          <View style={styles.recommendations}>
            <Text style={styles.sectionTitle}>Recommendations:</Text>
            {generateRecommendations(report).map((rec, i) => (
              <Text key={i} style={styles.recommendationItem}>• {rec}</Text>
            ))}
          </View>
        </View>

        <Text style={styles.footer}>
          Generated on {new Date().toLocaleDateString()}
        </Text>
      </Page>
    </Document>
  ).toBlob();

  return blob;
};

const generateRecommendations = (report: ReportData): string[] => {
  const recommendations: string[] = [];

  // Check punctuality
  if (parseFloat(report.punctuality.latePercentage) > 20) {
    recommendations.push("Consider improving morning punctuality. Arriving before 9:05 AM would increase productivity and overall work time.");
  }

  // Check weekly hours compared to expected
  const weeksBelowTarget = report.weeklyData.filter(week => week.totalMinutesDifference < 0).length;
  const weeksTotal = report.weeklyData.length;

  if (weeksBelowTarget / weeksTotal > 0.5) {
    recommendations.push("There's a pattern of not meeting weekly hour targets. Consider discussing workload management or time tracking accuracy.");
  }

  // Check work-life balance
  const longDays = report.dailyData.filter(day => day.totalMinutes > 10 * 60).length;
  if (longDays > report.dailyData.length * 0.3) {
    recommendations.push("There are several days with very long hours. Consider more balanced distribution of work throughout the week to prevent burnout.");
  }

  // Check consistency
  const totalMinutes = report.dailyData.map(d => d.totalMinutes);
  const avgMinutes = totalMinutes.reduce((sum, m) => sum + m, 0) / totalMinutes.length;
  const variance = totalMinutes.reduce((sum, m) => sum + Math.pow(m - avgMinutes, 2), 0) / totalMinutes.length;
  const stdDev = Math.sqrt(variance);

  if (stdDev > 120) { // More than 2 hours standard deviation
    recommendations.push("Work hours show high variability. A more consistent schedule might improve work-life balance and productivity.");
  }

  return recommendations.length > 0 ? recommendations : ["Employee shows good work patterns overall. Continue monitoring for any developing trends."];
}; 