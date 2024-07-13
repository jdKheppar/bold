import React from "react";
import Chart from "react-apexcharts";
import { Card } from "react-bootstrap";
import { ApexOptions } from "apexcharts";

// simple line chart
const CommissionChart = () => {
    // Your data
    const data = [
        {
            "order_id": 1,
            "sale_amount": 10,
            "commission_amount": 100,
            "order_date": "12-5-1"
        },
        {
            "order_id": 2,
            "sale_amount": 20,
            "commission_amount": 200,
            "order_date": "12-5-1"
        },
        {
            "order_id": 3,
            "sale_amount": 30,
            "commission_amount": 300,
            "order_date": "12-5-1"
        },
        {
            "order_id": 4,
            "sale_amount": 40,
            "commission_amount": 400,
            "order_date": "12-5-1"
        }
    ];

    // Extracting data for the chart
    const orderIds = data.map(item => `Order ${item.order_id}`);
    const saleAmounts = data.map(item => item.sale_amount);
    const commissionAmounts = data.map(item => item.commission_amount);

    // default options
    const apexLineChartWithLables: ApexOptions = {
        chart: {
            height: 380,
            type: "line",
            zoom: {
                enabled: false,
            },
            toolbar: {
                show: false,
            },
        },
        colors: ["#727cf5", "#0acf97"],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            width: [3, 3],
            curve: "smooth",
        },
        title: {
            text: "Sales and Commissions by Order",
            align: "left",
            style: {
                fontSize: "14px",
            },
        },
        grid: {
            row: {
                colors: ["transparent", "transparent"], // takes an array which will be repeated on columns
                opacity: 0.2,
            },
            borderColor: "#f1f3fa",
        },
        markers: {
            size: 6,
        },
        xaxis: {
            categories: orderIds,
            title: {
                text: "Order ID",
            },
        },
        yaxis: {
            title: {
                text: "Amount",
            },
            min: 0,
            // Adjusting the maximum value to accommodate the data range
            max: Math.max(...commissionAmounts) * 1.1,
        },
        legend: {
            position: "top",
            horizontalAlign: "right",
            floating: true,
            offsetY: -25,
            offsetX: -5,
        },
        responsive: [
            {
                breakpoint: 600,
                options: {
                    chart: {
                        toolbar: {
                            show: false,
                        },
                    },
                    legend: {
                        show: false,
                    },
                },
            },
        ],
    };

    // chart data
    const apexLineChartWithLablesData = [
        {
            name: "Sale Amount",
            data: saleAmounts,
        },
        {
            name: "Commission Amount",
            data: commissionAmounts,
        },
    ];

    return (
        <Card>
            <Card.Body>
                <h4 className="header-title mb-3">Line with Data Labels</h4>
                <Chart
                    options={apexLineChartWithLables}
                    series={apexLineChartWithLablesData}
                    type="line"
                    className="apex-charts"
                />
            </Card.Body>
        </Card>
    );
};

export default CommissionChart;
