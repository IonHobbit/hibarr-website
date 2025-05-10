"use client";

import { useState, useRef } from "react";
import { AlertCircle, FileText, User, File, Download } from "lucide-react";
import * as Papa from "papaparse";
import { LineChart, XAxis, YAxis, Tooltip, CartesianGrid, Line, Legend, ResponsiveContainer } from "recharts";
import { generatePDF } from "./_components/PDFReport";

// Type Definitions
type TimeEntry = {
  hours: number;
  minutes: number;
  clockIn?: string;
  clockOut?: string;
};

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

type WeekData = {
  week: number;
  totalMinutes: number;
  days: DayData[];
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

type Employee = {
  name: string;
  hoursPerWeek: number;
};

export default function WorkReportGenerator() {
  const [csvData, setCsvData] = useState<string[][]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessed, setIsProcessed] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Load the CSV file
  const loadCSV = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    try {
      const file = event.target.files?.[0];
      if (!file) {
        setIsLoading(false);
        return;
      }
      const fileContent = await file.text();

      Papa.parse(fileContent, {
        header: false,
        skipEmptyLines: true,
        dynamicTyping: true,
        complete: (results) => {
          setCsvData(results.data as string[][]);
          processEmployees(results.data as string[][]);
          setIsLoading(false);
        },
        error: (error: unknown) => {
          console.error("Error parsing CSV:", error);
          setIsLoading(false);
        }
      });
    } catch (error) {
      console.error("Error loading file:", error);
      setIsLoading(false);
    }
  };

  const processEmployees = (data: string[][]): void => {
    const employeeList: Employee[] = [];

    for (let i = 2; i < data.length; i++) {
      const row = data[i];
      if (row[0] && !row[0].toString().includes("Struktur") && !row[0].toString().endsWith("Agent") && !row[0].toString().endsWith("Department") && row[0] !== "") {
        // Check if this is an employee row with actual time data
        let hasTimeData = false;
        for (let j = 2; j < row.length; j++) {
          if (row[j] && typeof row[j] === 'string' && row[j].includes(':')) {
            hasTimeData = true;
            break;
          }
        }

        if (hasTimeData) {
          employeeList.push({
            name: row[0].toString(),
            hoursPerWeek: Number(row[1]) || 0
          });
        }
      }
    }

    setEmployees(employeeList);
  };

  const parseTimeEntry = (entry: string): TimeEntry | null => {
    if (!entry || typeof entry !== 'string' || !entry.includes('-')) return null;

    // Basic format: "7 30 09:00 - 16:30" (hours minutes clockIn - clockOut)
    const parts = entry.trim().split(' ');
    let hours = 0, minutes = 0, clockIn: string | undefined, clockOut: string | undefined;

    // Handle different formats in the data
    if (parts.length >= 4) {
      hours = parseInt(parts[0]) || 0;
      minutes = parseInt(parts[1]) || 0;

      // Find the index of the dash separator
      const dashIndex = parts.findIndex(p => p === '-');
      if (dashIndex > 0 && dashIndex < parts.length - 1) {
        clockIn = parts[dashIndex - 1];
        clockOut = parts[dashIndex + 1];
      }
    }

    return { hours, minutes, clockIn, clockOut };
  };

  const generateReport = (employeeName: string): void => {
    setIsLoading(true);

    // Find employee row in the data
    const employeeRowIndex = csvData.findIndex(row =>
      Array.isArray(row) && row[0] === employeeName
    );

    if (employeeRowIndex === -1) {
      setIsLoading(false);
      return;
    }

    const employeeRow = csvData[employeeRowIndex];
    if (!Array.isArray(employeeRow)) {
      setIsLoading(false);
      return;
    }

    const hoursPerWeek = Number(employeeRow[1]) || 0;

    // Process each day's entry
    const daysData: DayData[] = [];
    const datesRow = csvData[0];
    if (!Array.isArray(datesRow)) {
      setIsLoading(false);
      return;
    }
    const dates = datesRow.slice(2); // First row contains dates

    for (let i = 2; i < employeeRow.length; i++) {
      const entry = employeeRow[i];
      const date = dates[i - 2];

      if (entry && typeof entry === 'string' && entry.includes('-')) {
        const timeData = parseTimeEntry(entry);

        if (timeData) {
          const { hours, minutes, clockIn, clockOut } = timeData;

          // Format date
          const dateStr = typeof date === 'string' ? date : `Day ${i - 1}`;

          // Calculate total minutes worked
          const totalMinutes = (hours * 60) + minutes;

          // Determine if late (only if morning clock-in)
          const isLate = Boolean(clockIn &&
            clockIn.includes(':') &&
            parseInt(clockIn.split(':')[0]) < 12 &&
            (parseInt(clockIn.split(':')[0]) > 9 ||
              (parseInt(clockIn.split(':')[0]) === 9 &&
                parseInt(clockIn.split(':')[1]) > 5)));

          daysData.push({
            date: dateStr,
            totalMinutes,
            hours,
            minutes,
            clockIn,
            clockOut,
            isLate,
            note: isLate ? "Late Arrival" : ""
          });
        }
      }
    }

    // Calculate weekly data
    const weeklyData: WeeklySummary[] = [];
    const workDays = daysData.filter(day => day.totalMinutes > 0);

    // Group by week
    const weekMap: Record<number, WeekData> = {};
    workDays.forEach(day => {
      const dateMatch = day.date.match(/(\w+)\s+(\d+)/);
      if (dateMatch) {
        const dayOfMonth = parseInt(dateMatch[2]);
        const weekNum = Math.ceil(dayOfMonth / 7);

        if (!weekMap[weekNum]) {
          weekMap[weekNum] = {
            week: weekNum,
            totalMinutes: 0,
            days: []
          };
        }

        weekMap[weekNum].totalMinutes += day.totalMinutes;
        weekMap[weekNum].days.push(day);
      }
    });

    // Convert week map to array and calculate expected hours
    Object.keys(weekMap).forEach(weekNum => {
      const week = weekMap[parseInt(weekNum)];
      // const hours = week.days.length < 6 ? (hoursPerWeek / 6) * week.days.length : hoursPerWeek;
      const expectedMinutes = parseFloat(hoursPerWeek.toString()) * 60 || 48 * 60; // Default to 48 if not specified
      const differenceMinutes = week.totalMinutes - expectedMinutes;

      weeklyData.push({
        week: week.week,
        hoursWorked: formatHoursMinutes(week.totalMinutes),
        expectedHours: formatHoursMinutes(expectedMinutes),
        difference: formatHoursMinutes(differenceMinutes, true),
        totalMinutesWorked: week.totalMinutes,
        totalMinutesExpected: expectedMinutes,
        totalMinutesDifference: differenceMinutes
      });
    });

    // Calculate summary metrics
    const totalMinutesWorked = workDays.reduce((sum, day) => sum + day.totalMinutes, 0);
    const totalDaysWorked = workDays.length;
    const averageMinutesPerDay = totalDaysWorked > 0 ? totalMinutesWorked / totalDaysWorked : 0;

    // Find day with most/least hours
    let maxDay = { totalMinutes: 0, date: '' };
    let minDay = { totalMinutes: Number.MAX_SAFE_INTEGER, date: '' };

    workDays.forEach(day => {
      if (day.totalMinutes > maxDay.totalMinutes) {
        maxDay = { totalMinutes: day.totalMinutes, date: day.date };
      }
      if (day.totalMinutes < minDay.totalMinutes) {
        minDay = { totalMinutes: day.totalMinutes, date: day.date };
      }
    });

    // Count late days
    const lateDays = workDays.filter(day => day.isLate).length;
    const latePercentage = totalDaysWorked > 0 ? (lateDays / totalDaysWorked) * 100 : 0;

    // Calculate average start and end times
    const clockInTimes = workDays
      .filter(day => day.clockIn && day.clockIn.includes(':'))
      .map(day => {
        const [hours, minutes] = day.clockIn!.split(':').map(num => parseInt(num));
        return hours * 60 + minutes;
      });

    const clockOutTimes = workDays
      .filter(day => day.clockOut && day.clockOut.includes(':'))
      .map(day => {
        const [hours, minutes] = day.clockOut!.split(':').map(num => parseInt(num));
        return hours * 60 + minutes;
      });

    const avgClockInMinutes = clockInTimes.length > 0
      ? clockInTimes.reduce((sum, time) => sum + time, 0) / clockInTimes.length
      : 0;

    const avgClockOutMinutes = clockOutTimes.length > 0
      ? clockOutTimes.reduce((sum, time) => sum + time, 0) / clockOutTimes.length
      : 0;

    // Calculate totals for weekly data
    const totalWeeklyMinutesWorked = weeklyData.reduce((sum, week) => sum + week.totalMinutesWorked, 0);
    const totalWeeklyMinutesExpected = weeklyData.reduce((sum, week) => sum + week.totalMinutesExpected, 0);
    const totalWeeklyMinutesDifference = totalWeeklyMinutesWorked - totalWeeklyMinutesExpected;

    // Generate chart data
    const chartData = daysData.map(day => ({
      date: day.date,
      hoursWorked: day.totalMinutes / 60
    }));

    // Create report object
    const report: ReportData = {
      employeeName,
      hoursPerWeek,
      summary: {
        totalHoursWorked: formatHoursMinutes(totalMinutesWorked),
        totalDaysWorked,
        averageHoursPerDay: formatHoursMinutes(averageMinutesPerDay),
        dayWithMostHours: {
          date: maxDay.date,
          hours: formatHoursMinutes(maxDay.totalMinutes)
        },
        dayWithLeastHours: {
          date: minDay.date,
          hours: formatHoursMinutes(minDay.totalMinutes)
        }
      },
      punctuality: {
        lateDays,
        latePercentage: latePercentage.toFixed(2),
        averageStartTime: formatTimeFromMinutes(avgClockInMinutes),
        averageEndTime: formatTimeFromMinutes(avgClockOutMinutes)
      },
      weeklyData,
      dailyData: workDays,
      chartData,
      weeklyTotals: {
        hoursWorked: formatHoursMinutes(totalWeeklyMinutesWorked),
        expectedHours: formatHoursMinutes(totalWeeklyMinutesExpected),
        difference: formatHoursMinutes(totalWeeklyMinutesDifference, true)
      }
    };

    setReportData(report);
    setSelectedEmployee(employeeName);
    setIsLoading(false);
    setIsProcessed(true);
  };

  const formatHoursMinutes = (totalMinutes: number, showSign = false): string => {
    const sign = totalMinutes < 0 ? '-' : (showSign ? '+' : '');
    const absMinutes = Math.abs(totalMinutes);
    const hours = Math.floor(absMinutes / 60);
    const minutes = Math.floor(absMinutes % 60);
    return `${sign}${hours}:${minutes.toString().padStart(2, '0')}`;
  };

  const formatTimeFromMinutes = (totalMinutes: number): string => {
    const hours = Math.floor(totalMinutes / 60) % 24;
    const minutes = Math.floor(totalMinutes % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
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

  const handleDownloadPDF = async () => {
    if (!reportData) return;
    
    try {
      const blob = await generatePDF(reportData);
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${reportData.employeeName.replace(/\s+/g, '_')}_Work_Report.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-full">
      <div className="bg-blue-700 p-4 text-white flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center">
          <FileText className="mr-2" /> Employee Work Report Generator
        </h1>

        {csvData && (
          <button
            onClick={() => inputRef.current?.click()}
            className="flex items-center bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 cursor-pointer"
          >
            <input type="file" ref={inputRef} className="hidden" onChange={loadCSV} />
            <File className="w-4 h-4 mr-2" />
            Upload CSV
          </button>
        )}
      </div>

      <div className="flex flex-row flex-1 overflow-hidden">
        {/* Left sidebar */}
        <div className="w-64 bg-gray-100 p-4 border-r border-gray-200 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-3">Employees</h2>

          {isLoading && !employees.length ? (
            <div className="flex justify-center p-6">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <ul className="space-y-1">
              {employees.map((employee, index) => (
                <li key={index}>
                  <button
                    onClick={() => generateReport(employee.name)}
                    className={`flex items-center w-full p-2 rounded text-left cursor-pointer ${
                      selectedEmployee === employee.name
                        ? 'bg-blue-700 text-white'
                        : 'hover:bg-gray-200'
                    }`}
                  >
                    <User className="w-4 h-4 mr-2 shrink-0" />
                    <span className="flex-1 truncate">{employee.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 overflow-y-auto bg-white">
          {isLoading && (
            <div className="flex justify-center items-center h-full">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p>Generating report...</p>
              </div>
            </div>
          )}

          {!isLoading && !isProcessed && (
            <div className="flex flex-col items-center gap-4 justify-center h-full text-gray-500">
              <div className="flex flex-col items-center">
                <AlertCircle className="w-16 h-16 mb-4" />
                <h2 className="text-xl font-semibold mb-2">No Report Selected</h2>
                <p>Please select an employee from the list to generate a report.</p>
              </div>
              {!csvData && (
                <button
                  onClick={() => inputRef.current?.click()}
                  className="flex items-center bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 cursor-pointer"
                >
                  <input type="file" ref={inputRef} className="hidden" onChange={loadCSV} />
                  <File className="w-4 h-4 mr-2" />
                  Upload CSV
                </button>
              )}
            </div>
          )}

          {!isLoading && isProcessed && reportData && (
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">{reportData.employeeName} - Work Report</h2>
                <button
                  onClick={handleDownloadPDF}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
              </div>

              {/* Performance Summary */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-4">I. Employee Performance Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-sm text-gray-500">Total Hours Worked</p>
                    <p className="text-xl font-bold">{reportData.summary.totalHoursWorked}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-sm text-gray-500">Total Days Worked</p>
                    <p className="text-xl font-bold">{reportData.summary.totalDaysWorked}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-sm text-gray-500">Average Hours/Day</p>
                    <p className="text-xl font-bold">{reportData.summary.averageHoursPerDay}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-sm text-gray-500">Day with Most Hours</p>
                    <p className="text-xl font-bold">{reportData.summary.dayWithMostHours.date} ({reportData.summary.dayWithMostHours.hours})</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded md:col-span-2">
                    <p className="text-sm text-gray-500">Day with Least Hours</p>
                    <p className="text-xl font-bold">{reportData.summary.dayWithLeastHours.date} ({reportData.summary.dayWithLeastHours.hours})</p>
                  </div>
                </div>
              </div>

              {/* Punctuality Analysis */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-4">II. Punctuality Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-sm text-gray-500">Number of Late Days</p>
                    <p className="text-xl font-bold">{reportData.punctuality.lateDays}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-sm text-gray-500">Percentage of Late Days</p>
                    <p className="text-xl font-bold">{reportData.punctuality.latePercentage}%</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-sm text-gray-500">Average Start Time</p>
                    <p className="text-xl font-bold">{reportData.punctuality.averageStartTime}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <p className="text-sm text-gray-500">Average End Time</p>
                    <p className="text-xl font-bold">{reportData.punctuality.averageEndTime}</p>
                  </div>
                </div>
              </div>

              {/* Hours Chart */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-4">Daily Hours Distribution</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={reportData.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${Number(value).toFixed(2)} hours`, 'Hours Worked']} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="hoursWorked"
                        stroke="#3b82f6"
                        activeDot={{ r: 8 }}
                        name="Hours Worked"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Weekly Hours Analysis */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-4">III. Weekly Hours Analysis</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b text-left">Week</th>
                        <th className="py-2 px-4 border-b text-left">Hours Worked</th>
                        <th className="py-2 px-4 border-b text-left">Expected Hours</th>
                        <th className="py-2 px-4 border-b text-left">Difference</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.weeklyData.map((week, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-2 px-4 border-b">Week {week.week}</td>
                          <td className="py-2 px-4 border-b">{week.hoursWorked}</td>
                          <td className="py-2 px-4 border-b">{week.expectedHours}</td>
                          <td className={`py-2 px-4 border-b ${week.totalMinutesDifference >= 0 ? 'text-green-600' : 'text-red-600'
                            }`}>{week.difference}</td>
                        </tr>
                      ))}
                      <tr className="bg-gray-100 font-bold">
                        <td className="py-2 px-4 border-b">Total</td>
                        <td className="py-2 px-4 border-b">{reportData.weeklyTotals.hoursWorked}</td>
                        <td className="py-2 px-4 border-b">{reportData.weeklyTotals.expectedHours}</td>
                        <td className={`py-2 px-4 border-b ${parseFloat(reportData.weeklyTotals.difference) >= 0
                          ? 'text-green-600'
                          : 'text-red-600'
                          }`}>{reportData.weeklyTotals.difference}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Daily Work Log */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-4">IV. Daily Work Log</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="py-2 px-4 border-b text-left">Date</th>
                        <th className="py-2 px-4 border-b text-left">Hours Worked</th>
                        <th className="py-2 px-4 border-b text-left">Clock-In Time</th>
                        <th className="py-2 px-4 border-b text-left">Clock-Out Time</th>
                        <th className="py-2 px-4 border-b text-left">Note</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reportData.dailyData.map((day, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="py-2 px-4 border-b">{day.date}</td>
                          <td className="py-2 px-4 border-b">{formatHoursMinutes(day.totalMinutes)}</td>
                          <td className="py-2 px-4 border-b">{day.clockIn}</td>
                          <td className="py-2 px-4 border-b">{day.clockOut}</td>
                          <td className={`py-2 px-4 border-b ${day.isLate ? 'text-red-600' : ''}`}>
                            {day.note}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Work Pattern Analysis and Recommendations */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold border-b border-gray-300 pb-2 mb-4">V. Work Pattern Analysis and Recommendations</h3>
                <div className="bg-gray-50 p-6 rounded">
                  <h4 className="font-semibold mb-3">Analysis:</h4>
                  <p className="mb-4">
                    The employee worked a total of {reportData.summary.totalHoursWorked} hours over {reportData.summary.totalDaysWorked} days,
                    with an average of {reportData.summary.averageHoursPerDay} hours per working day.
                    {reportData.punctuality.lateDays > 0
                      ? ` They arrived late (after 9:05 AM) on ${reportData.punctuality.lateDays} days (${reportData.punctuality.latePercentage}% of workdays).`
                      : ' They have excellent punctuality with no late arrivals.'}
                    {' '}The average start time is {reportData.punctuality.averageStartTime} and end time is {reportData.punctuality.averageEndTime}.
                  </p>

                  <h4 className="font-semibold mb-3">Recommendations:</h4>
                  <ul className="list-disc pl-5 space-y-2">
                    {generateRecommendations(reportData).map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}