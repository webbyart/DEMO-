
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const PAGES = {
    HOME: 'home',
    LOGIN: 'login',
    CARB_COUNTER: 'carb_counter',
    KNOWLEDGE_ASSESSMENT: 'knowledge_assessment',
    IS_IT_TRUE_DOCTOR: 'is_it_true_doctor',
    INNOVATION_ASSESSMENT: 'innovation_assessment',
    KNOWLEDGE_BASE: 'knowledge_base',
};

const AppHeader = ({ navigateTo }) => (
    <header className="app-header">
        <div className="header-top-bar">
             <div className="logo-title">
                <img src="https://i.imgur.com/8f1CRaE.png" alt="Health Station Logo" className="logo" />
                <h2>"Health Station @ ท่าแซะ"</h2>
            </div>
        </div>
        <div className="header-nav-bar">
            <nav className="nav-menu">
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(PAGES.HOME); }} aria-label="Home">
                    <i className="fas fa-home"></i> Home
                </a>
                <a href="#">สำหรับเจ้าหน้าที่</a>
                <a href="#">ติดต่อเรา</a>
            </nav>
            <div className="search-container">
                <input type="search" placeholder="Search" className="search-input" />
                <button className="search-button">Search</button>
            </div>
        </div>
    </header>
);

const AppFooter = () => (
    <footer className="app-footer">
        <p>สงวนลิขสิทธิ์ © 2025  Health Station @ สาสุขท่าแซะ</p>
    </footer>
);


const HomePage = ({ navigateTo }) => (
    <div className="home-container">
        <div className="menu-grid">
            <button className="menu-button btn-green" onClick={() => navigateTo(PAGES.LOGIN)}>การคัดกรองสุขภาพ</button>
            <button className="menu-button btn-cyan" onClick={() => navigateTo(PAGES.CARB_COUNTER)}>นับคาร์บ</button>
            <button className="menu-button btn-yellow" onClick={() => navigateTo(PAGES.KNOWLEDGE_ASSESSMENT)}>ประเมินความรอบรู้</button>
            <button className="menu-button btn-red" onClick={() => navigateTo(PAGES.IS_IT_TRUE_DOCTOR)}>จริงไหมหมอ..!</button>
            <button className="menu-button btn-blue" onClick={() => navigateTo(PAGES.INNOVATION_ASSESSMENT)}>ประเมินนวัตกรรม</button>
            <button className="menu-button btn-gray" onClick={() => navigateTo(PAGES.KNOWLEDGE_BASE)}>คลังความรู้</button>
        </div>
    </div>
);

const LoginPage = ({ navigateTo }) => (
     <div className="container">
        <h1 className="page-title">เข้าสู่ระบบ</h1>
        <form onSubmit={(e) => e.preventDefault()} className="login-form">
            <div className="form-group">
                <label htmlFor="username">ชื่อผู้ใช้ / อีเมล</label>
                <input type="text" id="username" name="username" required/>
            </div>
            <div className="form-group">
                <label htmlFor="password">รหัสผ่าน</label>
                <input type="password" id="password" name="password" required/>
            </div>
            <div className="form-actions">
                <button type="submit" className="btn-submit">เข้าสู่ระบบ</button>
            </div>
        </form>
        <div className="back-button-container">
            <button className="back-button" onClick={() => navigateTo(PAGES.HOME)}>กลับ</button>
        </div>
    </div>
);


const CarbCounterPage = ({ navigateTo }) => (
    <div className="container">
        <div className="form-container">
            <h1 className="form-title">"NCDs ดีได้ ด้วยกลไก อสม."</h1>
            <p className="form-subtitle">แบบฟอร์มสำรวจการนับคาร์บ ปี 2568</p>
            <h2 className="form-subtitle">"ข้อมูลที่ได้จะนำไปวางแผน ดูแลและส่งเสริมสุขภาพประชาชนในพื้นที่"</h2>
            
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-section">
                    <i className="fas fa-user"></i>ข้อมูลบุคคล
                </div>
                <div className="form-grid">
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label className="required" htmlFor="id-card">เลขบัตรประชาชน</label>
                        <input type="text" id="id-card" name="id-card" />
                    </div>
                    <div className="form-group">
                        <label className="required" htmlFor="title">คำนำหน้า</label>
                        <select id="title" name="title">
                            <option>-- เลือกคำนำหน้า --</option>
                            <option>นาย</option>
                            <option>นาง</option>
                            <option>นางสาว</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="required" htmlFor="first-name">ชื่อ</label>
                        <input type="text" id="first-name" name="first-name" />
                    </div>
                    <div className="form-group">
                        <label className="required" htmlFor="last-name">นามสกุล</label>
                        <input type="text" id="last-name" name="last-name" />
                    </div>
                </div>

                <div className="form-section">
                    <i className="fas fa-map-marker-alt"></i>ข้อมูลที่อยู่ปัจจุบัน
                </div>
                <div className="form-grid">
                    <div className="form-group">
                        <label htmlFor="house-no">บ้านเลขที่</label>
                        <input type="text" id="house-no" name="house-no" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="moo">หมู่ที่</label>
                        <input type="text" id="moo" name="moo" />
                    </div>
                    <div className="form-group">
                        <label className="required" htmlFor="province">จังหวัด</label>
                        <select id="province" name="province"><option>-- เลือกจังหวัด --</option></select>
                    </div>
                    <div className="form-group">
                        <label className="required" htmlFor="district">อำเภอ</label>
                        <select id="district" name="district"><option>-- เลือกอำเภอ --</option></select>
                    </div>
                    <div className="form-group">
                        <label className="required" htmlFor="sub-district">ตำบล</label>
                        <select id="sub-district" name="sub-district"><option>-- เลือกตำบล --</option></select>
                    </div>
                </div>
                
                <div className="form-section">
                    <i className="fas fa-heartbeat"></i>ข้อมูลสุขภาพ
                </div>
                <div className="form-grid">
                    <div className="form-group">
                        <label className="required" htmlFor="age">อายุ</label>
                        <input type="number" id="age" name="age" />
                    </div>
                    <div className="form-group">
                        <label className="required">เพศ</label>
                        <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.5rem' }}>
                            <label><input type="radio" name="gender" value="male" /> ชาย</label>
                            <label><input type="radio" name="gender" value="female" /> หญิง</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="required" htmlFor="height">ส่วนสูง (cm)</label>
                        <input type="number" id="height" name="height" />
                    </div>
                    <div className="form-group">
                        <label className="required" htmlFor="weight">น้ำหนัก (kg)</label>
                        <input type="number" id="weight" name="weight" />
                    </div>
                    <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                        <label className="required" htmlFor="activity">กิจกรรม</label>
                        <select id="activity" name="activity"><option>-- เลือกกิจกรรม --</option></select>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="submit" className="btn-submit">บันทึกข้อมูล</button>
                    <button type="reset" className="btn-clear">ล้างข้อมูล</button>
                </div>
            </form>
        </div>
        <div className="back-button-container">
            <button className="back-button" onClick={() => navigateTo(PAGES.HOME)}>กลับ</button>
        </div>
    </div>
);

const RadioTable = ({ title, headers, questions, namePrefix }) => (
    <fieldset className="form-fieldset">
        <legend>{title}</legend>
        <div className="table-responsive">
            <table className="assessment-table">
                <thead>
                    <tr>
                        <th style={{width: '40%'}}></th>
                        {headers.map((h, i) => <th key={i}>{h}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {questions.map((q, index) => (
                        <tr key={index}>
                            <td>{index + 1}. {q}</td>
                            {headers.map((_, i) => (
                                <td key={i}><input type="radio" name={`${namePrefix}-${index}`} value={i} /></td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </fieldset>
);


const KnowledgeAssessmentPage = ({ navigateTo }) => {
    const [isAsst, setIsAsst] = useState(false);

    return (
    <div className="container">
        <h1 className="page-title">แบบประเมินความรอบรู้ด้านสุขภาพและพฤติกรรมสุขภาพของประชาชน</h1>
        <p>เพื่อป้องกันโรคติดเชื้อและโรคไร้เชื้อที่สำคัญของประชาชนวัยทำงาน ในหมู่บ้านปรับเปลี่ยนพฤติกรรมสุขภาพ รอบ2/67</p>
        <div className="form-instructions">
            <p><b>คำชี้แจง:</b> แบบประเมินนี้มีจุดมุ่งหมาย ใช้เพื่อเก็บข้อมูลเกี่ยวกับความสามารถ ทักษะ และการปฏิบัติตนด้านสุขภาพของประชาชนวัยทำงาน อายุ 15 ปีขึ้นไป...</p>
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="knowledge-assessment-form">
            <fieldset className="form-fieldset">
                <legend>ตอนที่ 1 ข้อมูลทั่วไปของผู้ตอบแบบประเมิน</legend>
                <div className="form-group required">
                    <label>ชื่ออำเภอ</label>
                    <div className="radio-group-inline">
                        <label><input type="radio" name="district" /> เมืองชุมพร</label>
                        <label><input type="radio" name="district" /> ท่าแซะ</label>
                        <label><input type="radio" name="district" /> ปะทิว</label>
                        <label><input type="radio" name="district" /> หลังสวน</label>
                        <label><input type="radio" name="district" /> ละแม</label>
                        <label><input type="radio" name="district" /> พะโต๊ะ</label>
                         <label><input type="radio" name="district" /> สวี</label>
                        <label><input type="radio" name="district" /> ทุ่งตะโก</label>
                    </div>
                </div>
                <div className="form-grid">
                    <div className="form-group">
                        <label className="required" htmlFor="sub-district">ชื่อตำบล</label>
                        <input type="text" id="sub-district" name="sub-district" />
                    </div>
                    <div className="form-group">
                        <label className="required" htmlFor="village">ชื่อหมู่บ้าน</label>
                        <input type="text" id="village" name="village" />
                    </div>
                </div>
                <div className="form-group required">
                     <label>1. เพศ</label>
                     <div className="radio-group-inline">
                        <label><input type="radio" name="gender-ka" /> ชาย</label>
                        <label><input type="radio" name="gender-ka" /> หญิง</label>
                     </div>
                </div>
                 <div className="form-group required">
                     <label>2. ปัจจุบันท่านอายุ</label>
                     <div className="radio-group-inline">
                        <label><input type="radio" name="age-ka" /> อายุ 15 - 19 ปี</label>
                        <label><input type="radio" name="age-ka" /> อายุ 20 - 29 ปี</label>
                        <label><input type="radio" name="age-ka" /> อายุ 30 - 39 ปี</label>
                        <label><input type="radio" name="age-ka" /> อายุ 40 - 49 ปี</label>
                        <label><input type="radio" name="age-ka" /> อายุ 50 - 59 ปี</label>
                     </div>
                </div>
                 <div className="form-group required">
                     <label>3. ท่านจบการศึกษาสูงสุดหรือกำลังศึกษาระดับชั้นใด</label>
                     <div className="radio-group-inline">
                        <label><input type="radio" name="education-ka" /> ไม่ได้เรียนหนังสือ</label>
                        <label><input type="radio" name="education-ka" /> ประถมศึกษา</label>
                        <label><input type="radio" name="education-ka" /> มัธยมศึกษาตอนต้น</label>
                        <label><input type="radio" name="education-ka" /> มัธยมศึกษาตอนปลาย/ปวช.</label>
                        <label><input type="radio" name="education-ka" /> อนุปริญญา/ปวส.</label>
                        <label><input type="radio" name="education-ka" /> ปริญญาตรีขึ้นไป</label>
                     </div>
                </div>
                <div className="form-group required">
                     <label>4. ท่านมีบทบาท/ตำแหน่ง/สถานะทางสังคมแบบใด</label>
                     <div className="radio-group-inline">
                        <label><input type="radio" name="role-ka" /> อสม.</label>
                        <label><input type="radio" name="role-ka" /> ผู้ใหญ่บ้าน/กำนัน/กรรมการชุมชน</label>
                        <label><input type="radio" name="role-ka" /> ประชาชนในชุมชน</label>
                     </div>
                </div>
            </fieldset>

            <RadioTable 
              title="องค์ประกอบที่ 1 ทักษะการเข้าถึงข้อมูลและบริการสุขภาพ"
              headers={['ไม่เคยทำ', 'ทำได้ยากมาก', 'ทำได้ยาก', 'ทำได้ง่าย', 'ทำได้ง่ายมาก']}
              questions={[
                "ท่านสามารถหาแหล่งข้อมูล เมื่อต้องการข้อมูลด้านสุขภาพและวิธีป้องกันตนเองได้โดยทันที",
                "ท่านสามารถเสาะหาแหล่งบริการสุขภาพที่จะให้การช่วยเหลือด้านสุขภาพ",
                "ท่านสามารถติดต่อเบอร์สายด่วนสุขภาพที่จะให้การช่วยเหลือด้านสุขภาพ",
                "ท่านสามารถตรวจสอบข้อมูลและแหล่งข้อมูลด้านสุขภาพ เพื่อให้ได้ข้อมูลที่ถูกต้อง เป็นจริง"
              ]}
              namePrefix="sec2-1"
            />
            
            <RadioTable 
              title="องค์ประกอบที่ 2 ด้านการเข้าใจข้อมูลสุขภาพ"
              headers={['ไม่เคยทำ', 'ทำได้ยากมาก', 'ทำได้ยาก', 'ทำได้ง่าย', 'ทำได้ง่ายมาก']}
              questions={[
                "ท่านสามารถอ่านข้อมูลด้านสุขภาพและวิธีการป้องกันตนเองด้วยความเข้าใจวิธีการปฏิบัติตามคำแนะนำในคู่มือ หรือเว็บไซต์",
                "ท่านสามารถอ่านฉลากอาหารและยา ที่ได้รับถึงวิธีการกิน การใช้ การเก็บรักษา และผลข้างเคียง",
                "ท่านสามารถเข้าใจข้อมูลสุขภาพที่นำเสนอในรูปของสัญลักษณ์ คำศัพท์ตัวเลขหรือเครื่องหมายในสถานพยาบาลได้",
                "ท่านกล้าซักถามผู้เชี่ยวชาญด้านสุขภาพ เช่น หมอ พยาบาล เจ้าหน้าที่สาธารณสุข เพื่อเพิ่มเข้าใจวิธีการดูแลสุขภาพให้ความเข้าใจที่ถูกต้อง"
              ]}
              namePrefix="sec2-2"
            />
            
            <fieldset className="form-fieldset">
                <legend>ตอนที่ 3 พฤติกรรมสุขภาพ</legend>
                 <RadioTable 
                  title="3.1 การบริโภคอาหาร"
                  headers={['6 - 7 วัน', '4 - 5 วัน', '3 วัน', '1 - 2 วัน', 'ไม่ปฏิบัติ']}
                  questions={[
                    "ท่านกินผักและผลไม้สดที่ไม่หวานจัด อย่างน้อยวันละครึ่งกิโลกรัม",
                    "ท่านมักกินอาหารแบบเดิม ซ้ำๆ จำเจ",
                    "ท่านกินอาหารที่มีไขมันสูง เช่น อาหารทอด แกงกะทิ เนื้อติดมัน เป็นต้น",
                    "ท่านกินขนมที่มีรสหวานเช่น ลูกอม ขนมเชื่อม หรือผลไม้ที่มีน้ำตาลสูง",
                    "ท่านดื่มเครื่องดื่มที่มีรสหวาน เช่น น้ำอัดลม น้ำแดง น้ำเขียว",
                    "ท่านกินอาหารรสเค็ม หมักดอง หรือเติมน้ำปลาเพิ่มในอาหาร"
                  ]}
                  namePrefix="sec3-1"
                />
                 <RadioTable 
                  title="3.2 พฤติกรรมสุขภาพการป้องกันโรคติดเชื้อโควิด-19"
                  headers={['ทุกครั้ง', 'บ่อยครั้ง', 'บางครั้ง', 'นานๆครั้ง', 'ไม่ปฏิบัติ']}
                  questions={[
                    "ท่านใช้สิ่งของส่วนตัว เช่น จาน ช้อนส้อม แก้วน้ำ ผ้าเช็ดตัว ฯลฯ ร่วมกับผู้อื่น",
                    "ท่านล้างหรือทำความสะอาดมือก่อนสัมผัสใบหน้า ตา ปาก จมูก",
                    "ท่านกินอาหารปรุงสุก และสะอาด",
                    "ท่านรับประทานอาหารร่วมกับผู้อื่น",
                    "หลังจากจับสิ่งของสาธารณะ เช่น ราวบันได ที่จับประตู ปุ่มกดลิฟท์ เป็นต้นท่านล้างมือด้วยสบู่ หรือใช้เจลแอลกอฮอล์ล้างมือ",
                    "ท่านสวมใส่หน้ากากผ้าหรือหน้ากากอนามัย",
                    "ท่านทำความสะอาดบ้านและข้าวของเครื่องใช้ ที่ใช้ร่วมกันในบ้าน เช่น ลูกบิดประตู ราวบันได เป็นต้น"
                  ]}
                  namePrefix="sec3-2"
                />
            </fieldset>
            
            <fieldset className="form-fieldset">
                <legend>ตอนที่ 4 การมีส่วนร่วมจัดกิจกรรม</legend>
                 <div className="form-group required">
                     <label>คุณเป็นอสม. หรือไม่</label>
                     <div className="radio-group-inline">
                        <label><input type="radio" name="is-asst" onChange={() => setIsAsst(true)} /> ใช่</label>
                        <label><input type="radio" name="is-asst" onChange={() => setIsAsst(false)} defaultChecked/> ไม่ใช่</label>
                     </div>
                </div>
                {isAsst && (
                    <RadioTable 
                      title="(สำหรับอสม.) การมีส่วนร่วม"
                      headers={['ทุกครั้ง', 'บางครั้ง', 'ไม่ปฏิบัติ']}
                      questions={[
                        "ร่วมกิจกรรมประเมิน เฝ้าระวังพฤติกรรมเสี่ยงต่อโรคติดเชื้อ และโรคไร้เชื้อเช่น การคัดกรองความเสี่ยงทางด้านสุขภาพ เป็นต้น",
                        "ร่วมทำแผนปรับเปลี่ยนพฤติกรรม เช่น วิเคราะห์ปัญหา ออกแบบกิจกรรม ออกแบบนวตกรรม เป็นต้น",
                        "จัดกิจกรรมให้ความรู้ป้องกันโรคติดเชื้อ และโรคไร้เชื้อ เป็นต้น",
                        "จัดกิจกรรมชมรมเสริมสร้างทักษะด้านสุขภาพ เช่น เต้นแอโรบิค สาธิตเมนูชูสุขภาพ สมาธิบำบัด เป็นต้น",
                        "ร่วมกำหนดและบังคับใช้มาตรการทางสังคมในการดูแลสุขภาพ เช่น ร่วมกำหนดให้เป็นหมู่บ้านปลอดบุหรี่ เป็นต้น"
                      ]}
                      namePrefix="sec4"
                    />
                )}
            </fieldset>

            <div className="form-actions">
                <button type="submit" className="btn-submit">บันทึก</button>
                <button type="reset" className="btn-clear">ยกเลิก</button>
            </div>
        </form>
         <div className="back-button-container">
            <button className="back-button" onClick={() => navigateTo(PAGES.HOME)}>กลับ</button>
        </div>
    </div>
    );
};


const IsItTrueDoctorPage = ({ navigateTo }) => {
    const healthUnits = [
        { id: 1, name: 'รพ.สต.บ้านแก่งกระทั่ง', line: 'https://line.me/ti/p/~@line' },
        { id: 2, name: 'รพ.สต.ปากทรง', line: 'https://line.me/ti/p/~@line' },
        { id: 3, name: 'รพ.สต.ชันเงิน', line: 'https://line.me/ti/p/~@line' },
    ];

    return (
        <div className="container">
            <h1 className="page-title">จริงไหมหมอ..!</h1>
            <div className="table-responsive">
                <table className="styled-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>หน่วยบริการสาธารณสุข</th>
                            <th>Line Official</th>
                        </tr>
                    </thead>
                    <tbody>
                        {healthUnits.map((unit, index) => (
                            <tr key={unit.id}>
                                <td>{index + 1}</td>
                                <td>{unit.name}</td>
                                <td>
                                    <a href={unit.line} target="_blank" rel="noopener noreferrer" className="line-button">
                                        <img src="https://scdn.line-apps.com/n/line_add_friends/btn/th.png" alt="เพิ่มเพื่อน" />
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="back-button-container">
                <button className="back-button" onClick={() => navigateTo(PAGES.HOME)}>กลับ</button>
            </div>
        </div>
    );
};

const InnovationAssessmentPage = ({ navigateTo }) => (
    <div className="container">
        <h1 className="page-title">ประเมินความพึงพอใจ</h1>
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
                <label>ท่านมีความพึงพอใจต่อการใช้ นวัตกรรม Health Station @ ชุมพร อยู่ในระดับใด..?</label>
                <div className="radio-group">
                    <label><input type="radio" name="satisfaction" value={5} /> พอใจมากที่สุด</label>
                    <label><input type="radio" name="satisfaction" value={4} /> พอใจมาก</label>
                    <label><input type="radio" name="satisfaction" value={3} /> พอใจปานกลาง</label>
                    <label><input type="radio" name="satisfaction" value={2} /> พอใจน้อย</label>
                    <label><input type="radio" name="satisfaction" value={1} defaultChecked /> พอใจน้อยที่สุด</label>
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="suggestions">ข้อเสนอแนะ</label>
                <textarea id="suggestions" name="suggestions" rows={5}></textarea>
            </div>
            <div className="form-grid-2">
                <div className="form-group">
                    <label htmlFor="eval-date">วันที่ประเมิน</label>
                    <input type="date" id="eval-date" name="eval-date" />
                </div>
                <div className="form-group">
                    <label htmlFor="eval-name">ลงชื่อ</label>
                    <input type="text" id="eval-name" name="eval-name" />
                </div>
            </div>
            <div className="form-actions">
                <button type="submit" className="btn-submit">บันทึก</button>
                <button type="button" className="btn-cancel" onClick={() => navigateTo(PAGES.HOME)}>กลับ</button>
            </div>
        </form>
    </div>
);

const KnowledgeBasePage = ({ navigateTo }) => {
    const videos = [
        { id: 1, title: 'ความเชื่อผิดๆ เกี่ยวกับการกินไข่', category: 'วัยเรียนวัยรุ่น', thumb: 'https://i.ytimg.com/vi/aZUWl1gU5wI/hqdefault.jpg' },
        { id: 2, title: 'รู้จักกิน แพวลิตินสุขภาพ "ขาบ สุขใจ"', category: 'บุคคลทั่วไป', thumb: 'https://i.ytimg.com/vi/A5xOCo2tWlA/hqdefault.jpg' },
        { id: 3, title: 'เพราะเราไม่ได้อยู่กับอาหารที่ควรกิน', category: 'บุคคลทั่วไป', thumb: 'https://i.ytimg.com/vi/W45P0Z8zV4U/hqdefault.jpg' },
        { id: 4, title: 'Title Placeholder 4', category: 'Category', thumb: 'https://via.placeholder.com/480x360.png/007BFF/FFFFFF?text=Video' },
        { id: 5, title: 'Title Placeholder 5', category: 'Category', thumb: 'https://via.placeholder.com/480x360.png/28A745/FFFFFF?text=Video' },
        { id: 6, title: 'Title Placeholder 6', category: 'Category', thumb: 'https://via.placeholder.com/480x360.png/FFC107/FFFFFF?text=Video' },
    ];
    return (
        <>
            <div className="knowledge-header">
                <h1>โภชนาการ</h1>
            </div>
            <div className="container">
                <div className="knowledge-grid">
                    {videos.map(video => (
                        <div key={video.id} className="video-card" tabIndex={0} role="button" aria-label={`Play video: ${video.title}`}>
                            <div className="video-thumbnail">
                                <img src={video.thumb} alt={video.title} />
                                <div className="play-icon"><i className="fas fa-play-circle"></i></div>
                            </div>
                            <div className="video-info">
                                <p>{video.category}</p>
                                <h3>{video.title}</h3>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="back-button-container">
                    <button className="back-button" onClick={() => navigateTo(PAGES.HOME)}>กลับ</button>
                </div>
            </div>
        </>
    );
};

const App = () => {
    const [currentPage, setCurrentPage] = useState(PAGES.HOME);
    const navigateTo = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    const renderPage = () => {
        switch (currentPage) {
            case PAGES.LOGIN: return <LoginPage navigateTo={navigateTo} />;
            case PAGES.CARB_COUNTER: return <CarbCounterPage navigateTo={navigateTo} />;
            case PAGES.KNOWLEDGE_ASSESSMENT: return <KnowledgeAssessmentPage navigateTo={navigateTo} />;
            case PAGES.IS_IT_TRUE_DOCTOR: return <IsItTrueDoctorPage navigateTo={navigateTo} />;
            case PAGES.INNOVATION_ASSESSMENT: return <InnovationAssessmentPage navigateTo={navigateTo} />;
            case PAGES.KNOWLEDGE_BASE: return <KnowledgeBasePage navigateTo={navigateTo} />;
            case PAGES.HOME:
            default:
                return <HomePage navigateTo={navigateTo} />;
        }
    };

    return (
        <>
            <AppHeader navigateTo={navigateTo} />
            <main>
                {renderPage()}
            </main>
            <AppFooter />
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
