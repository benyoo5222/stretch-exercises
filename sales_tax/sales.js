//  This function take in array of objects and calculates the total sales and total sales for each company

const calculateSalesTax = function (salesData, taxRates) {
  const totalCalculatedObject = {};
  // We are going to iterate through sales data and check to see if the company name exists in the calculated object
  // If it exists, simply add the total sales and add the sales amount
  // If it doesn't create key and value

  for (let companySalesInfoObject of salesData) {
    // If the company name isnt in the calculated object create it
    if (!totalCalculatedObject[companySalesInfoObject.name]) {
      totalCalculatedObject[companySalesInfoObject.name] = {
        totalSales: 0,
        totalTaxes: 0,
      };
    }

    for (let sale of companySalesInfoObject.sales) {
      totalCalculatedObject[companySalesInfoObject.name].totalSales += sale;
      totalCalculatedObject[companySalesInfoObject.name].totalTaxes +=
        sale * taxRates[companySalesInfoObject.province];
    }
  }

  return totalCalculatedObject;
};

const salesTaxRates = {
  AB: 0.05,
  BC: 0.12,
  SK: 0.1,
};

const companySalesData = [
  {
    name: "Telus",
    province: "BC",
    sales: [100, 200, 400],
  },
  {
    name: "Bombardier",
    province: "AB",
    sales: [80, 20, 10, 100, 90, 500],
  },
  {
    name: "Telus",
    province: "SK",
    sales: [500, 100],
  },
];

console.log(calculateSalesTax(companySalesData, salesTaxRates));
