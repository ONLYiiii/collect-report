import pdfMake from 'pdfmake/build/pdfmake'
import pdf from '@/plugins/pdfmake-style'
import { formatLicid } from '@/helpers/formatLicid'

function createTable(items) {
  const incomeTable = {
    table: {
      widths: [25, 145, 50],
      body: [
        [
          {
            text: 'รายรับ',
            style: 'tableHeader',
            alignment: 'center',
            colSpan: 3,
          },
          { text: '', style: 'tableHeader', alignment: 'center' },
          { text: '', style: 'tableHeader', alignment: 'center' },
        ],
        [
          {
            text: 'ลำดับ',
            style: 'tableHeader',
            alignment: 'center',
          },
          {
            text: 'รายการ',
            style: 'tableHeader',
            alignment: 'center',
          },
          {
            text: 'จำนวนเงิน',
            style: 'tableHeader',
            alignment: 'center',
          },
        ],
      ],

      layout: {
        hLineWidth: function (i, node) {
          return i === 0 || i === node.table.body.length ? 1 : 0
        },
        vLineWidth: function () {
          return 0
        },
        hLineColor: function (i, node) {
          return i === 0 || i === node.table.body.length ? 'black' : 'black'
        },
      },
    },
  }

  const expenseTable = {
    table: {
      widths: [25, 145, 50],
      body: [
        [
          {
            text: 'รายจ่าย',
            style: 'tableHeader',
            alignment: 'center',
            colSpan: 3,
          },
          { text: '', style: ' head', alignment: 'center' },
          { text: '', style: ' head', alignment: 'center' },
        ],
        [
          {
            text: 'ลำดับ',
            style: 'tableHeader',
            alignment: 'center',
          },
          {
            text: 'รายการ',
            style: 'tableHeader',
            alignment: 'center',
          },
          {
            text: 'จำนวนเงิน',
            style: 'tableHeader',
            alignment: 'center',
          },
        ],
      ],
      layout: {
        hLineWidth: function (i, node) {
          return i === 0 || i === node.table.body.length ? 1 : 0
        },
        vLineWidth: function () {
          return 0
        },
        hLineColor: function (i, node) {
          return i === 0 || i === node.table.body.length ? 'black' : 'black'
        },
      },
    },
  }

  let incomeIndex = 1
  let expenseIndex = 1
  items.forEach((item) => {
    if (item.accType === 1) {
      incomeTable.table.body.push([
        { text: incomeIndex, style: 'head', alignment: 'center' },
        { text: item.accDetail, style: 'head', alignment: 'start' },
        {
          text: item.accAmount.toFixed(2),
          style: 'head',
          alignment: 'right',
        },
      ])
      incomeIndex++
    } else if (item.accType === 2) {
      expenseTable.table.body.push([
        { text: expenseIndex, style: 'head', alignment: 'center' },
        { text: item.accDetail, style: 'head', alignment: 'start' },
        {
          text: item.accAmount.toFixed(2),
          style: 'head',
          alignment: 'right',
        },
      ])
      expenseIndex++
    } else if (item.accType === 3) {
      incomeTable.table.body.push([
        {
          text: 'รวมรายรับทั้งหมด',
          colSpan: 2,
          style: 'head',
          alignment: 'right',
        },
        {},
        {
          text: item.income.toFixed(2),
          style: 'head',
          alignment: 'right',
        },
      ])

      expenseTable.table.body.push([
        {
          text: 'รวมรายจ่ายทั้งหมด',
          colSpan: 2,
          style: 'head',
          alignment: 'right',
        },
        {},
        {
          text: item.expense.toFixed(2),
          style: 'head',
          alignment: 'right',
        },
      ])
    }
  })

  return [incomeTable, expenseTable]
}

export default function exportPdf(items) {
  console.log(items)
  const [incomeTable, expenseTable] = createTable(items)

  var docDefinition = {
    content: [
      {
        text: `ประกาศยอดรับและจ่ายเงินและทรัพย์สิน\nข้อมูลตามใบอนุญาตจัดให้มีการเรี่ยไร (แบบ ร๓) เลขที่ ${formatLicid(
          items[0].licId
        )}`,
        alignment: 'center',
        style: 'topHead',
      },
      {
        columns: [
          {
            width: 'auto',
            stack: [
              incomeTable,
              {
                marginLeft: 80,
                marginTop: 10,
                columnGap: 65,
                columns: [
                  {
                    width: 'auto',
                    stack: [
                      {
                        text: `รวมรายรับทั้งหมด`,
                        alignment: 'left',
                        style: 'head',
                      },
                      {
                        text: `รวมจ่ายทั้งหมด`,
                        alignment: 'left',
                        style: 'head',
                      },
                      {
                        text: `คงเหลือ`,
                        alignment: 'left',
                        style: 'head',
                      },
                    ],
                  },
                  {
                    width: 'auto',
                    stack: [
                      {
                        text: items[items.length - 2].income.toFixed(2),
                        alignment: 'right',
                        style: 'head',
                      },
                      {
                        text: items[items.length - 2].expenses.toFixed(2),
                        alignment: 'right',
                        style: 'head',
                      },
                      {
                        text: items[items.length - 1].income.toFixed(2),
                        alignment: 'right',
                        style: 'head',
                        decoration: 'underline',
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            width: 'auto',
            stack: [expenseTable],
          },
        ],
        style: 'tableExample',
      },
    ],

    styles: {
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black',
        fillColor: '#A6C9EC',
      },
      head: {
        bold: true,
        fontSize: 13,
        color: 'black',
      },
      topHead: {
        bold: true,
        fontSize: 15,
        color: 'black',
        font: 'THSarabunIT9',
      },
      textBelow: {
        bold: true,
        fontSize: 13,
        color: 'black',
      },
    },
    defaultStyle: pdf.primaryStyle(),
  }

  pdfMake.createPdf(docDefinition).open()
}
