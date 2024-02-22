class Reqinfo {
  constructor() {
    this.rqSubreg = 0 // รหัสประเภทใบอนุญาต
    this.rqRcode = '' // รหัสสำนักทะเบียนที่ออกใบคำร้อง
    this.rqId = 0 // เลขรับที่รับคำร้อง (1/2551:25510000001)
    this.licRcode = '' // รหัสสำนักทะเบียนที่ออกใบอนุญาต
    this.licId = '' // เลขที่ใบอนุญาต
    this.reflcRcode = '' // อ้างถึงใบอนุญาต ร.1 มาตรา8 กรณี RQ_SUBREG <> 2 , field นี้ = blank  reflicRcode
    this.reflcDate = ''
    this.reflcId = '' // อ้างถึงใบอนุญาต ร.1 มาตรา8 กรณี RQ_SUBREG <> 2 , field นี้ = blank  reflicId
    this.reflcStatus = 0 // คำรับรองของผู้ได้รับอนุญาตจัดให้มีการเรี่ยไร (ได้ใบอนุญาต ร.1 มาตรา 8) (0:ยังไม่ได้รับคำรับรอง,1:รับรอง)  reflicStatus
    this.rqWrAt = '' // เขียนที่
    this.appealFlag = 0 // การยื่นอุทธรณ์ เฉพาะมาตรา 8 (0:ปกติ , 1: ยื่นอุทธรณ์ , 3: ไม่ยื่นอุทธรณ์)
    this.orgSubtypeCode = 0 // "ประเภทการเรี่ยไร ไปดูจาก EBUSINESS
    this.orgRcode = '' // รหัสสำนักทะเบียนที่ออกใบอนุญาตของ   นิติบุคคล / มูลนิธิ/สมาคม
    this.orgId = '' // เลขที่ของนิติบุคคล / ใบสำคัญของมูลนิธิ/สมาคม
    this.objective = ''// วัตถุประสงค์
    this.pidPicture = '' // รูปภาพผู้ได้รับใบอนุญาต เก็บ Full path
    this.licHis = 0 // ประวัติการออกใบอนุญาต
    this.maxValue = 0 // จำนวนเงินหรือทรัพย์สินสูงสุดที่ขออนุญาตทำการเรี่ยไร
    this.rcodeLocation = '' // สำนักทะเบียนที่ทำการเรี่ยไร
    this.location = '' // ชื่อสถานที่ที่จะทำการเรี่ยไร
    this.locationMap = '' // รูปภาพสถานที่เรี่ยไร เก็บ Full path
    this.sdate = 0 // วันที่เริ่มเรี่ยไร
    this.edate = 0 // วันสิ้นสุดการเรี่ยไร
    this.stime = 0 // เวลาที่เริ่มเรี่ยไร
    this.etime = 0 // เวลาสิ้นสุดการเรี่ยไร
    this.collectType = '' // วิธีการเก็บรักษาเงิน
    this.collectProcess = '' // วิธีทำการเรี่ยไร
    this.reflicDate = 0 // อ้างถึงใบอนุญาต ร.3 มาตรา8 กรณี RQ_SUBREG <> 2 , field นี้ = blank
    this.maxValueString = '' // จำนวนเงินหรือทรัพย์สินสูงสุดที่ขออนุญาตทำการเรี่ยไร
    this.mPosition = '' // ชื่อตำแหน่ง
    this.accountPlan = '' // ไฟล์รูป
    this.locationCat = 0 // catm กรณีมาตรา 8
  }
}

export default Reqinfo
