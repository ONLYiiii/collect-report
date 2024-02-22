class Licinfo {
  constructor() {
    this.licSubReg = '' // รหัสประเภทใบอนุญาต
    this.licRcode = '' // รหัสสำนักทะเบียนที่ออกใบอนุญาต
    this.licId = '' // เลขที่ใบอนุญาต
    this.rqRcode = '' // รหัสสำนักทะเบียนที่ออกใบคำร้อง
    this.rqId = '' // เลขรับที่รับคำร้อง (1/2551:25510000001)
    this.orgSubTypeCode = '' // "ประเภทการเรี่ยไร ไปดูจาก EBUSINESS
    this.orgRcode = '' // รหัสสำนักทะเบียนที่ออกใบอนุญาตของ   นิติบุคคล / มูลนิธิ/สมาคม
    this.orgId = '' // เลขที่ของนิติบุคคล / ใบสำคัญของมูลนิธิ/สมาคม
    this.pidPicture = '' // รูปภาพผู้ได้รับใบอนุญาต เก็บ Full path
    // this.book = ''
    // this.textHeader = ''
  }
}

export default Licinfo
