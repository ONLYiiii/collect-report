import pdf from '@/plugins/pdfmake-style'

function exportPdf() {
  const docDefination = {
    pageMargins: [35, 50, 35, 30],
    content: [
      {
        text: `ประกาศยอดรับและจ่ายเงินและทรัพย์สิน`,
        bold: true,
        alignment: 'center',
      },
      {
        text: `ข้อมูลตามใบอนุญาตจัดให้มีการเรี่ยไร (แบบ ร.๓) เลขที่ `,
        bold: true,
        alignment: 'center',
      },
      {
        columns: [
          {
            width: '50%',
            color: '#444',
            styles: '',
            table: {
              widths: [30, '*', 50],
              headerRows: 1,
              body: [
                [{ text: 'รายรับ', bold: true, colSpan: 3, alignment: 'center' }, {}, {}],
                [{ text: 'ลำดับ', bold: true, alignment: 'center' }, { text: 'รายการ', bold: true, alignment: 'center' }, { text: 'จำนวนเงิน', bold: true, alignment: 'center' }],
              ]
            }
          },
          {
            width: '50%',
            color: '#444',
            styles: '',
            table: {
              widths: [30, '*', 50],
              headerRows: 1,
              body: [
                [{ text: 'รายจ่าย', bold: true, colSpan: 3, alignment: 'center' }, {}, {}],
                [{ text: 'ลำดับ', bold: true, alignment: 'center' }, { text: 'รายการ', bold: true, alignment: 'center' }, { text: 'จำนวนเงิน', bold: true, alignment: 'center' }],
              ]
            }
          },
        ],
      },
      {
        margin: [0, 15, 0, 0],
        text: `รวมรายรับทั้งหมด `,
        bold: true,
      },
      {
        text: `รวมรายจ่ายทั้งหมด `,
        bold: true,
      },
      {
        text: `คงเหลือ `,
        bold: true,
      },
    ],

    styles: {
      header: {
        fontSize: 20,
        bold: true
      },
      header18: {
        fontSize: 18,
        bold: true
      },
      body: {
        fontSize: 16,
        bold: false,
        lineHeight: 1.1
      },
      smallText: {
        fontSize: 10,
        bold: false,
        lineHeight: 1.1
      }
    },
    defaultStyle: pdf.primaryStyle(),
  }
  pdf.pdfPrintPreview(docDefination)
}

export default { exportPdf }
