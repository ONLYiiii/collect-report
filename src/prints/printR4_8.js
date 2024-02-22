import pdf from '@/plugins/pdfmake-style'

function exportPdf() {

  let content = []
  content.push(
    {
      text: 'ทำการเรี่ยไรโดยใช้วิธี',
      style: 'body',
      marginLeft: 55,
    },
    {
      text: 'ในการเรี่ยไร ซึ่ง',
      style: 'body',
    },
    {
      text: 'เป็นผู้ได้รับอนุญาตจัดให้มีการเรี่ยไรตามใบอนุญาตเลขที่',
      style: 'body',
    },
    {
      text: 'โดยมีวัตถุประสงค์',
      style: 'body',
    },
    {
      text: 'ใบอนุญาตนี้ให้ใช้ได้เฉพาะภายในเขตและสถานที่',
      style: 'body',
    },
    {
      text: 'ตั้งแต่วันที่' + '.'.repeat(68) + 'ถึงวันที่' + '.'.repeat(68),
      style: 'body',
    },
    {
      text: 'ระหว่างเวลา' + '.'.repeat(68) + 'ถึงเวลา' + '.'.repeat(68),
      style: 'body',
    },
    {
      text: 'ออกให้ ณ วันที่                          เดือน                          พ.ศ.',
      style: 'body',
      marginLeft: 30,
    },

    {
      text: '(ลงชื่อ)  ',
      style: 'body',
      alignment: 'center',
      // marginLeft: 100, // 200
      marginTop: 20
    },
    {
      text: 'ตำแหน่ง        ผู้อำนวยการศูนย์บริการประชาชน ปฏิบัติราชการแทน ',
      style: 'body',
      alignment: 'center',
      marginLeft: 150,
    },

    {
      text: 'ผู้อำนวยการสำนักงานสอบสวนและนิติการ',
      alignment: 'center',
      style: 'body',
      marginLeft: 195,
      marginBottom: 15
    },
    {
      text: 'พนักงานเจ้าหน้าที่',
      marginLeft: 220,
      alignment: 'center',
      style: 'body',
    },
    {
      text: 'ประทับตราประจำตำแหน่ง',
      style: 'body',
      alignment: 'center',
      marginLeft: 230,
      marginBottom: 20
    },
    {
      text: 'ตำเตือน การเรี่ยไรที่เกิดกำหนดที่ได้รับอนุญาตเป็นความผิดมาตรา ๑๗ แห่งพระราชบัญญัติควบคุมการเรี่ยไร',
      style: 'body',
    },
    {
      text: 'พุทธศักราช ๒๔๘๗ ต้องโทษระวาง ปรับไม่เกินสองร้อยบาทหรือจำคุกไม่เกินหนึ่งเดือนหรือทั้งปรับทั้งจำ',
      style: 'body',
      pageBreak: 'after'
    },
    {
      text: 'ข้อกำหนดเงื่อนไขวิธีการเรี่ยไร ตามติดคณะกรรมการควบคุมการเรี่ยไร',
      style: 'header18',
      alignment: 'center',
    },
    {
      text: 'ออกตามความในพระราชบัญญัติควบคุมการเรี่ยไร พุทธศักราช ๒๔๘๗ มาตรา ๙ (๔)',
      style: 'header18',
      alignment: 'center',
    },
    {
      text: 'ข้อ ๑ ผู้ทำการเรี่ยไร ต้องเป็นผู้ได้รับอนุญาตจากทางราชการให้ทำการเรี่ยไร',
      style: 'body',
      marginLeft: 105,
    },
    {
      text: 'และจะต้องมีใบอนุญาตจัดให้มีการเรี่ยไร (แบบ ร.๓) พร้อมทั้งข้อกำหนดเงื่อนไขวิธีการเรี่ยไรติดตัวขณะ',
      style: 'body',
    },
    {
      text: 'ทำการเรี่ยไร และต้องให้เจ้าหน้าที่หรือบุคคลผู้ประสงค์จะเข้าส่วนในการเรี่ยไรตรวจดูเมื่อเจ้าหน้าที่หรือ',
      style: 'body',
    },
    {
      text: 'บุคคลนั้นเรียกร้อง',
      style: 'body',
    },
    {
      text: 'ข้อ ๒ ผู้ทำการเรี่ยไร ต้องมีอายุไม่ต่ำกว่า ๑๖ ปี',
      style: 'body',
      marginLeft: 105,
    },
    {
      text: 'ข้อ ๓ การเรี่ยไรในสถานที่ราชการ ต้องได้รับอนุญาตจากหัวหน้าหน่วยราชการ',
      style: 'body',
      marginLeft: 105,
    },
    {
      text: 'หรือผู้ที่หัวหน้าหน่วยราชการมอบหมาย และจะต้องปฎิบัติตามเกณฑ์และวิธีการของส่วนราชการนั้น',
      style: 'body',
    },
    {
      text: 'ข้อ ๔ ห้ามเดินทำการเรี่ยไรในที่สาธารณะ ให้กำหนดจุดรับการเรี่ยไรแทน และ',
      style: 'body',
      marginLeft: 105,
    },
    {
      text: 'การเรี่ยไรในสถานที่ส่วนบุคคล เช่น ร้านค้าหรือร้านอาหาร ก่อนทำการเรี่ยไรต้องขออนุญาตจากเจ้าของ',
      style: 'body',
    },
    {
      text: 'สถานที่ และเมื่อได้รับอนุญาตห้ามเดินทำการเรี่ยไร ให้กำหนดจุดรับการเรี่ยไรแทน',
      style: 'body',
    },
    {
      text: 'ข้อ ๕ การรับเงินหรือทรัพย์สินที่เรี่ยไรได้ต้องออกใบรับแก่ผู้บริจาคมีต้นขั้ว',
      style: 'body',
      marginLeft: 105,
    },
    {
      text: 'ใบรับไว้เป็นหลักฐานทุกครั้ง หากผ่าผืนมีความผิดต้องระวางโทษปรับไม่เกิน ๕oo บาท หรือจำคุกไม่เกิน',
      style: 'body',
    },
    {
      text: '๖ เดือน หรือทั้งปรับทั้งจำ',
      style: 'body',
    },
    {
      text: 'ข้อ ๖ ในเรี่ยไรห้ามมิให้ใช้ถ้อยคำหรือวิธีกาารใดๆ ซึ่งเป็นการบังคับผู้ถูกเรี่ยไร',
      style: 'body',
      marginLeft: 105,
    },
    {
      text: 'โดยตรง หรือโดยปริยาย หรือซึ่งจะทำให้ผู้ถูกเรี่ยไรเกิดความหวาดหวั่น หรือเกรงกลัว หรือเกิดความ',
      style: 'body',
    },
    {
      text: 'เดือนร้อนรำคาญ หากฝ่าฝืนมีความผิดต้องระวางโทษปรับไม่เกิน ๑,ooo บาท หรือจำคุกไม่เกิน ๑ ปี หรือ',
      style: 'body',
    },
    {
      text: 'ทั้งปรับทั้งจำ',
      style: 'body',
    },
    {
      text: 'ข้อ ๗ ผู้เรี่ยไรต้องเก็บเงินจากกล่องรับบริจาคทุกเดือน พร้อมจัดทำบัญชีรายรับ-',
      style: 'body',
      marginLeft: 105,
    },
    {
      text: 'รายจ่ายประจำเดือน และจัดทำประกาศยอดรายรับ-รายจ่าย ที่ได้จากการเรี่ยไรทุกสิ้นเดือน ปิดไว้',
      style: 'body',
    },
    {
      text: 'ณ ที่ทำการของมูลนิธิ สมาคม เพื่อให้ประชาชนทราบ แล้วจัดส่งสำเนาประกาศยอดรายรับ - รายจ่าย และ',
      style: 'body',
    },
    {
      text: 'สำเนาบัญชีรายรับ-รายจ่ายเงินที่ได้จากการเรี่ยไรดังกล่าว ให้สำนักการสอบสวนและนิติการ ฝ่ายเลขานุการ',
      style: 'body',
    },
    {
      text: 'ทุกสิ้นเดือน',
      style: 'body',
    },
    {
      text: 'ข้อ ๘ ผู้ทำการเรี่ยไรจะต้องปฏิบัติตามเงื่อนไขในใบอนุญาตจัดให้มีการเรี่ยไร',
      style: 'body',
      marginLeft: 105,
    },
    {
      text: '(แบบ ร.๓) ด้วย',
      style: 'body',
    },
  )


  const docDefination = {
    pageMargins: [55, 50, 55, 30],
    content: [
      {
        text: 'ร.๔',
        style: 'body',
        alignment: 'right',
      },
      {
        text: '(มาตรา๖)',
        style: 'smallText',
        alignment: 'right',
      },
      {
        text: 'คำขอ',
        style: 'smallText',
        alignment: 'right',
      },
      {
        text: 'เลขที่',
        style: 'body',
        alignment: 'left',
      },
      {
        text: 'ใบอนุญาตทำการเรี่ยไร',
        alignment: 'center',
        style: 'header',
        bold: true,
      },

      {
        text: 'อาศัยอำนาจตามความในมาตรา ๖ และมาตรา ๘ แห่งพระราชบัญญัติควบคุมการเรี่ยไร พุทธศักราช ๒๔๘๗',
        marginLeft: 30,
        style: 'body',
      },
      {
        text: 'อนุญาตให้',
        style: 'body',
      },
      {
        text: 'เลขประจำตัวประชาชน',
        style: 'body',
      },
      {
        text: 'สัญชาติ' + '.'.repeat(30) + 'เชื้อชาติ' + '.'.repeat(30) + 'อายุ' + '.'.repeat(15) + 'ปี อยู่บ้านเลขที่' + '.'.repeat(20) + 'หมู่ที่' + '.'.repeat(28),
        style: 'body',
      },
      {
        text: 'ตรอย/ซอย' + '.'.repeat(31) + 'ถนน' + '.'.repeat(31) + 'ตำบล/แขวง' + '.'.repeat(31),
        style: 'body',
      },
      {
        text: 'อำเภอ/เขต' + '.'.repeat(50) + 'จังหวัด' + '.'.repeat(50),
        style: 'body',
        margin: [0, 0, 0, 10]
      },
      ...content
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
