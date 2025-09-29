

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';

// --- Supabase Client Setup ---
// NOTE FOR USER: The "TypeError: Failed to fetch" error is a CORS issue.
// You MUST configure CORS in your Supabase project settings.
// Go to Project Settings > API > CORS Configuration and add your app's URL.
const supabaseUrl = 'https://fvczvzmgyxcjamibrubit.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2Y3p2em1neGNqYW1pYnJ1cGl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMjE2MDUsImV4cCI6MjA3NDY5NzYwNX0.tk7AQrusK8mco8MsF0Fuo-BE3gH7gWSfzFBmlnxHKEk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);


const PAGES = {
    HOME: 'home',
    CARB_COUNTER: 'carb_counter',
    KNOWLEDGE_ASSESSMENT: 'knowledge_assessment',
    IS_IT_TRUE_DOCTOR: 'is_it_true_doctor',
    INNOVATION_ASSESSMENT: 'innovation_assessment',
    KNOWLEDGE_BASE: 'knowledge_base',
    LOGIN: 'login',
    REGISTER: 'register',
    
    // Admin Pages
    ADMIN_DASHBOARD: 'admin_dashboard',
    ADMIN_USER_MANAGEMENT: 'admin_user_management',
    ADMIN_ADD_USER: 'admin_add_user',
    ADMIN_HEALTH_STATION_MANAGEMENT: 'admin_health_station_management',
    ADMIN_ADD_HEALTH_STATION: 'admin_add_health_station',
    
    ADMIN_SCREENING_DASHBOARD: 'admin_screening_dashboard',
    ADMIN_SCREENING_BMI: 'admin_screening_bmi',
    ADMIN_ADD_SCREENING_BMI: 'admin_add_screening_bmi',
    ADMIN_SCREENING_WAIST: 'admin_screening_waist',
    ADMIN_ADD_SCREENING_WAIST: 'admin_add_screening_waist',
    ADMIN_SCREENING_BP: 'admin_screening_bp',
    ADMIN_ADD_SCREENING_BP: 'admin_add_screening_bp',
    ADMIN_SCREENING_SUGAR: 'admin_screening_sugar',
    ADMIN_ADD_SCREENING_SUGAR: 'admin_add_screening_sugar',
    ADMIN_SCREENING_SMOKING: 'admin_screening_smoking',
    ADMIN_ADD_SCREENING_SMOKING: 'admin_add_screening_smoking',
    ADMIN_SCREENING_ALCOHOL: 'admin_screening_alcohol',
    ADMIN_ADD_SCREENING_ALCOHOL: 'admin_add_screening_alcohol',
    ADMIN_SCREENING_DEPRESSION: 'admin_screening_depression',
    ADMIN_ADD_SCREENING_DEPRESSION: 'admin_add_screening_depression',
    
    ADMIN_KNOWLEDGE_ASSESSMENT_RESULTS: 'admin_knowledge_assessment_results',
    ADMIN_INNOVATION_ASSESSMENT_RESULTS: 'admin_innovation_assessment_results',
    ADMIN_EVALUATION_RESULTS: 'admin_evaluation_results', // This could be deprecated or reused
    ADMIN_REPORTS: 'admin_reports',
};


const healthUnits = [
    { id: 1, name: 'รพ.สต.บ้านแก่งกระทั่ง', lineId: '@healthstation1' },
    { id: 2, name: 'รพ.สต.ปากทรง', lineId: '@healthstation2' },
    { id: 3, name: 'รพ.สต.ขันเงิน', lineId: '@healthstation3' },
    { id: 4, name: 'รพ.สต.บ้านท่าแซะ', lineId: '@healthstation4' },
    { id: 5, name: 'รพ.สต.บางมะพร้าว', lineId: '@healthstation5' },
];

const addressData = {
    "ชุมพร": {
        "เมืองชุมพร": ["ตากแดด", "บางหมาก", "นาทุ่ง", "บางลึก", "ขุนกระทิง", "ทุ่งคา", "วังไผ่", "หาดทรายรี", "ถ้ำสิงห์", "นาชะอัง", "ท่ายาง", "วังใหม่", "บ้านนา", "หาดพันไกร", "วิสัยเหนือ", "บางสน"],
        "ท่าแซะ": ["ท่าแซะ", "หงษ์เจริญ", "นากระตาม", "คุริง", "สลุย", "ท่าข้าม", "รับร่อ", "สองพี่น้อง", "ทรัพย์อนันต์", "หินแก้ว"],
        "ปะทิว": ["ปะทิว", "บางสน", "ทะเลทรัพย์", "สะพลี", "ชุมโค", "ดอนยาง", "เขาไชยราช"],
        "หลังสวน": ["หลังสวน", "ขันเงิน", "พ้อแดง", "บ้านควน", "บางมะพร้าว", "นาขา", "แหลมทราย", "วังตะกอ", "หาดยาย", "ท่ามะพลา", "บางน้ำจืด", "ปากน้ำ", "นาพญา"],
        "ละแม": ["ละแม", "ทุ่งหลวง", "สวนแตง", "ทุ่งคาวัด"],
        "พะโต๊ะ": ["พะโต๊ะ", "ปากทรง", "ปังหวาน", "พระรักษ์"],
        "สวี": ["สวี", "นาโพธิ์", "ทุ่งระยะ", "ท่าหิน", "ปากแพรก", "ด่านสวี", "วิสัยใต้", "เขาทะลุ", "เขาค่าย", "ครน", "ในวง"],
        "ทุ่งตะโก": ["ทุ่งตะโก", "ตะโก", "ช่องไม้แก้ว", "ปากตะโก"]
    }
};

// --- Reusable Components ---
const AppHeader = ({ navigateTo, isLoggedIn, handleLogout }) => (
    <header className="app-header">
        <div className="header-content">
            <div className="logo-container" onClick={() => navigateTo(PAGES.HOME)} style={{ cursor: 'pointer' }}>
                <img src="https://storage.googleapis.com/fpl-prompt-images/3468961719/original_image.png" alt="Thasae District Public Health Office Logo" />
                <div className="logo-text">
                    <h2>สำนักงานสาธารณสุข <span>อำเภอท่าแซะ</span></h2>
                    <p>Thasae District Public Health Office</p>
                </div>
            </div>
            <nav className="main-nav">
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(PAGES.HOME); }}>หน้าหลัก</a>
                {isLoggedIn ? (
                    <>
                        <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(PAGES.ADMIN_DASHBOARD); }}>สำหรับเจ้าหน้าที่</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); handleLogout(); }}>ออกจากระบบ</a>
                    </>
                ) : (
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(PAGES.LOGIN); }}>สำหรับเจ้าหน้าที่</a>
                )}
                <a href="#">ติดต่อเรา</a>
            </nav>
        </div>
    </header>
);

const AppFooter = () => (
    <footer className="app-footer">
        <p>สงวนลิขสิทธิ์ © 2025 สำนักงานสาธารณสุขอำเภอท่าแซะ | พัฒนาระบบโดย Health Station @ ท่าแซะ</p>
    </footer>
);

const PageHeader = ({ title, subtitle }) => (
    <div className="page-header">
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
    </div>
);

const ConsentModal = ({ onAgree, onDisagree }) => (
    <div className="modal-overlay">
        <div className="modal-content">
            <div className="modal-header">
                <h2>ข้อกำหนดและเงื่อนไขการเก็บรวบรวมข้อมูลในระบบ 3 หมอรู้จักคุณ</h2>
                <button onClick={onDisagree} className="modal-close-btn">&times;</button>
            </div>
            <div className="modal-body" style={{fontSize: '0.9rem', textAlign: 'left'}}>
                <strong>1. วัตถุประสงค์ของการเก็บรวบรวมข้อมูล</strong>
                <p>กรมสนับสนุนบริการสุขภาพ กระทรวงสาธารณสุข (ต่อไปนี้เรียกว่า "สบส.") มีวัตถุประสงค์ในการเก็บรวบรวมข้อมูลจากประชาชนผ่านระบบ 3 หมอรู้จักคุณ เพื่อ:</p>
                <ul>
                    <li>สนับสนุนการดำเนินโครงการลดคาร์โบไฮเดรตเพื่อสุขภาพ</li>
                    <li>วิเคราะห์แนวโน้มและพฤติกรรมด้านสุขภาพของประชาชน</li>
                    <li>ปรับปรุงและพัฒนานโยบายด้านสุขภาพ</li>
                    <li>ให้คำแนะนำด้านสุขภาพเฉพาะบุคคล</li>
                </ul>

                <strong>2. ประเภทของข้อมูลที่เก็บรวบรวม</strong>
                <p>กรมฯ อาจเก็บรวบรวมข้อมูลส่วนบุคคลและข้อมูลสุขภาพ ซึ่งรวมถึงแต่ไม่จำกัดเพียง:</p>
                <ul>
                    <li>ข้อมูลทั่วไป เช่น ชื่อ-นามสกุล อายุ เพศ</li>
                    <li>ข้อมูลติดต่อ เช่น ที่อยู่</li>
                    <li>ข้อมูลด้านสุขภาพ เช่น น้ำหนัก ส่วนสูง</li>
                    <li>ข้อมูลพฤติกรรมการบริโภคอาหารและการออกกำลังกาย</li>
                </ul>

                <strong>3. วิธีการเก็บรวบรวมข้อมูล</strong>
                <p>ข้อมูลของท่านจะถูกเก็บรวบรวมผ่านช่องทางดังต่อไปนี้:</p>
                <ul>
                    <li>การลงทะเบียนและกรอกแบบฟอร์มออนไลน์ผ่านระบบ 3 หมอรู้จักคุณ</li>
                    <li>การตอบแบบสอบถามที่เกี่ยวข้องกับสุขภาพ</li>
                    <li>การให้ข้อมูลโดยสมัครใจผ่านกิจกรรมของ สบส.</li>
                </ul>

                <strong>4. การใช้ข้อมูล</strong>
                <p>ข้อมูลที่เก็บรวบรวมจะถูกนำไปใช้เพื่อ:</p>
                <ul>
                    <li>วิเคราะห์และจัดทำรายงานเชิงสถิติที่ไม่ระบุตัวตน</li>
                    <li>วิจัยและพัฒนาแนวทางการดูแลสุขภาพ</li>
                    <li>ประสานงานกับหน่วยงานที่เกี่ยวข้องเพื่อปรับปรุงคุณภาพการให้บริการด้านสุขภาพ</li>
                    <li>ให้คำแนะนำที่เหมาะสมกับสุขภาพของแต่ละบุคคล</li>
                </ul>

                <strong>5. การเปิดเผยข้อมูล</strong>
                <p>สบส. จะไม่เปิดเผยข้อมูลส่วนบุคคลของท่านแก่บุคคลภายนอก ยกเว้นในกรณีต่อไปนี้:</p>
                <ul>
                    <li>ได้รับความยินยอมจากเจ้าของข้อมูล</li>
                    <li>เป็นไปตามข้อกำหนดของกฎหมายหรือคำสั่งของหน่วยงานภาครัฐ</li>
                    <li>มีความจำเป็นเพื่อปกป้องสุขภาพหรือความปลอดภัยของบุคคล</li>
                </ul>

                <strong>6. การรักษาความปลอดภัยของข้อมูล</strong>
                <p>สบส. มีมาตรการในการรักษาความปลอดภัยของข้อมูล เช่น:</p>
                <ul>
                    <li>การเข้ารหัสข้อมูลเพื่อป้องกันการเข้าถึงโดยไม่ได้รับอนุญาต</li>
                    <li>การกำหนดสิทธิ์การเข้าถึงข้อมูลเฉพาะบุคลากรที่เกี่ยวข้อง</li>
                    <li>การตรวจสอบและปรับปรุงมาตรการรักษาความปลอดภัยอย่างต่อเนื่อง</li>
                </ul>

                <strong>7. สิทธิของเจ้าของข้อมูล</strong>
                <p>ประชาชนที่ให้ข้อมูลผ่านระบบ 3 หมอรู้จักคุณ มีสิทธิ์ดังต่อไปนี้:</p>
                <ul>
                    <li>ขอเข้าถึงข้อมูลส่วนบุคคลของตนเอง</li>
                    <li>ขอแก้ไขหรือปรับปรุงข้อมูลที่ไม่ถูกต้อง</li>
                    <li>ขอให้ลบหรือระงับการใช้ข้อมูลของตนเอง ยกเว้นในกรณีที่กฎหมายกำหนดให้ต้องเก็บรักษาไว้</li>
                </ul>

                <strong>8. การติดต่อสอบถาม</strong>
                <p>หากท่านมีข้อสงสัยหรือร้องเรียนเกี่ยวกับการเก็บรวบรวมข้อมูล กรุณาติดต่อ: กรมสนับสนุนบริการสุขภาพ กระทรวงสาธารณสุข<br/>
                ที่อยู่: เลขที่ 88/44 หมู่ 4 ซอยสาธารณสุข 8 ถนนติวานนท์ ตำบลตลาดขวัญ อำเภอเมืองนนทบุรี จังหวัดนนทบุรี รหัสไปรษณีย์ 11000<br/>
                โทรศัพท์: 02-193-7000 | อีเมล์: saraban@hss.mail.go.th | เว็บไซต์: https://hss.moph.go.th</p>

                <strong>9. การเปลี่ยนแปลงข้อกำหนดและเงื่อนไข</strong>
                <p>สบส. ขอสงวนสิทธิ์ในการเปลี่ยนแปลงข้อกำหนดและเงื่อนไขนี้โดยไม่ต้องแจ้งให้ทราบล่วงหน้า ทั้งนี้ การเปลี่ยนแปลงจะถูกประกาศผ่านทางเว็บไซต์ของ สบส.</p>
            </div>
            <div className="checkbox-group">
                <label>
                    <input type="checkbox" id="consent-checkbox" />
                    ข้าพเจ้าได้อ่านและยินยอมให้ผูกพันตามเงื่อนไขภายใต้ข้อตกลงการให้บริการนี้
                </label>
            </div>
            <div className="modal-footer">
                <button className="btn btn-secondary" onClick={onDisagree} style={{marginRight: '0.5rem'}}>ไม่ยินยอม</button>
                <button className="btn btn-primary" onClick={() => {
                    if ((document.getElementById('consent-checkbox') as HTMLInputElement).checked) {
                        onAgree();
                    } else {
                        alert('โปรดยอมรับเงื่อนไขก่อนดำเนินการต่อ');
                    }
                }}>ยินยอม</button>
            </div>
        </div>
    </div>
);


// --- Public Pages ---

const HomePage = ({ navigateTo }) => (
    <div className="container">
        <div className="welcome-banner">
            <h2>ยินดีต้อนรับสู่ Health Station ท่าแซะ</h2>
            <p>"NCDs ดีได้ ด้วยกลไก อสม." - ระบบดูแลและส่งเสริมสุขภาพประชาชนในพื้นที่ท่าแซะ</p>
        </div>
        <div className="home-grid">
            <div className="home-card color-1" onClick={() => navigateTo(PAGES.LOGIN)}>
                <div className="icon"><i className="fa-solid fa-heart-pulse"></i></div>
                <div><h3>การคัดกรองสุขภาพ</h3><p>เข้าสู่ระบบเพื่อบันทึกข้อมูลการคัดกรองสุขภาพ</p></div>
            </div>
            <div className="home-card color-2" onClick={() => navigateTo(PAGES.CARB_COUNTER)}>
                <div className="icon"><i className="fa-solid fa-calculator"></i></div>
                <div><h3>นับคาร์บ</h3><p>แบบฟอร์มสำรวจการนับคาร์บ ปี 2568</p></div>
            </div>
            <div className="home-card color-3" onClick={() => navigateTo(PAGES.KNOWLEDGE_ASSESSMENT)}>
                <div className="icon"><i className="fa-solid fa-book-open-reader"></i></div>
                <div><h3>ประเมินความรอบรู้</h3><p>แบบประเมินความรอบรู้ด้านสุขภาพและพฤติกรรมสุขภาพ</p></div>
            </div>
            <div className="home-card color-4" onClick={() => navigateTo(PAGES.IS_IT_TRUE_DOCTOR)}>
                <div className="icon"><i className="fa-solid fa-user-doctor"></i></div>
                <div><h3>จริงไหมหมอ..!</h3><p>รายการหน่วยบริการสาธารณสุขในพื้นที่</p></div>
            </div>
            <div className="home-card color-5" onClick={() => navigateTo(PAGES.INNOVATION_ASSESSMENT)}>
                <div className="icon"><i className="fa-solid fa-star"></i></div>
                <div><h3>ประเมินนวัตกรรม</h3><p>ประเมินความพึงพอใจ Health Station @ ท่าแซะ</p></div>
            </div>
            <div className="home-card color-6" onClick={() => navigateTo(PAGES.KNOWLEDGE_BASE)}>
                <div className="icon"><i className="fa-solid fa-database"></i></div>
                <div><h3>คลังความรู้</h3><p>บทความและวิดีโอความรู้ด้านสุขภาพ</p></div>
            </div>
        </div>
    </div>
);

const CarbCounterPage = ({ navigateTo }) => {
    const [showConsent, setShowConsent] = useState(true);
    const [formData, setFormData] = useState({
        id_card: '', title: '', first_name: '', last_name: '',
        house_no: '', moo: '', province: 'ชุมพร', district: '', sub_district: '',
        age: '', gender: '', height: '', weight: '', activity: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const districts = formData.province ? Object.keys(addressData[formData.province]) : [];
    const subDistricts = formData.district ? addressData[formData.province][formData.district] : [];

    const handleInputChange = (e) => {
        const { id, value, name } = e.target;

        setFormData(prevData => {
            const newData = { ...prevData };
            if (name === 'gender') {
                newData.gender = value;
            } else {
                 newData[id] = value;
            }
            // Reset dependent fields
            if (id === 'province') {
                newData.district = '';
                newData.sub_district = '';
            }
            if (id === 'district') {
                newData.sub_district = '';
            }
            return newData;
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const { data, error } = await supabase
            .from('carb_counting_data') 
            .insert([formData]);

        if (error) {
            console.error('Error inserting data:', error);
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล: ' + (error.message || JSON.stringify(error)));
        } else {
            alert('บันทึกข้อมูลสำเร็จ!');
            setFormData({ // Reset form
                id_card: '', title: '', first_name: '', last_name: '',
                house_no: '', moo: '', province: 'ชุมพร', district: '', sub_district: '',
                age: '', gender: '', height: '', weight: '', activity: ''
            });
            navigateTo(PAGES.HOME);
        }
        setIsSubmitting(false);
    };


    if (showConsent) {
        return <ConsentModal onAgree={() => setShowConsent(false)} onDisagree={() => navigateTo(PAGES.HOME)} />;
    }

    return (
        <div className="container">
            <div className="page-container">
                <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                    <h1 style={{color: 'var(--primary-color)'}}>"NCDs ดีได้ ด้วยกลไก อสม."</h1>
                    <p>แบบฟอร์มสำรวจการนับคาร์บ ปี 2568</p>
                    <p className="form-subtitle">"ข้อมูลที่ได้จะนำไปวางแผน ดูแลและส่งเสริมสุขภาพประชาชนในพื้นที่"</p>
                </div>
                <form onSubmit={handleSubmit}>
                    <h2 className="form-section-header">ข้อมูลบุคคล</h2>
                    <div className="form-grid">
                        <div className="form-group"><label className="required" htmlFor="id_card">เลขบัตรประชาชน</label><input type="text" id="id_card" placeholder="กรอกเลขบัตรประชาชน 13 หลัก" value={formData.id_card} onChange={handleInputChange} /></div>
                        <div className="form-group"><label className="required" htmlFor="title">คำนำหน้า</label><select id="title" value={formData.title} onChange={handleInputChange}><option>-- เลือกคำนำหน้า --</option><option>เด็กชาย</option><option>เด็กหญิง</option><option>นาย</option><option>นางสาว</option><option>นาง</option></select></div>
                        <div className="form-group"><label className="required" htmlFor="first_name">ชื่อ</label><input type="text" id="first_name" placeholder="กรอกชื่อ" value={formData.first_name} onChange={handleInputChange}/></div>
                        <div className="form-group"><label className="required" htmlFor="last_name">นามสกุล</label><input type="text" id="last_name" placeholder="กรอกนามสกุล" value={formData.last_name} onChange={handleInputChange}/></div>
                    </div>
                    <h2 className="form-section-header">ข้อมูลที่อยู่ปัจจุบัน</h2>
                    <div className="form-grid">
                        <div className="form-group"><label className="required" htmlFor="house_no">บ้านเลขที่</label><input type="text" id="house_no" value={formData.house_no} onChange={handleInputChange}/></div>
                        <div className="form-group"><label htmlFor="moo">หมู่ที่</label><input type="text" id="moo" value={formData.moo} onChange={handleInputChange}/></div>
                        <div className="form-group"><label className="required" htmlFor="province">จังหวัด</label><select id="province" value={formData.province} onChange={handleInputChange}><option value="ชุมพร">ชุมพร</option></select></div>
                        <div className="form-group"><label className="required" htmlFor="district">อำเภอ</label><select id="district" value={formData.district} onChange={handleInputChange}><option value="">-- เลือกอำเภอ --</option>{districts.map(d => <option key={d} value={d}>{d}</option>)}</select></div>
                        <div className="form-group"><label className="required" htmlFor="sub_district">ตำบล</label><select id="sub_district" value={formData.sub_district} onChange={handleInputChange}><option value="">-- เลือกตำบล --</option>{subDistricts.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
                    </div>
                     <h2 className="form-section-header">ข้อมูลนับคาร์บ</h2>
                    <div className="form-grid">
                        <div className="form-group"><label className="required" htmlFor="age">อายุ</label><input type="number" id="age" value={formData.age} onChange={handleInputChange}/></div>
                        <div className="form-group"><label className="required">เพศ</label>
                            <div style={{display: 'flex', gap: '1rem', paddingTop: '0.5rem'}}>
                                <label><input type="radio" name="gender" value="male" checked={formData.gender === 'male'} onChange={handleInputChange}/> ชาย</label>
                                <label><input type="radio" name="gender" value="female" checked={formData.gender === 'female'} onChange={handleInputChange}/> หญิง</label>
                            </div>
                        </div>
                        <div className="form-group"><label className="required" htmlFor="height">ส่วนสูง (cm)</label><input type="number" id="height" value={formData.height} onChange={handleInputChange}/></div>
                        <div className="form-group"><label className="required" htmlFor="weight">น้ำหนัก (kg)</label><input type="number" id="weight" value={formData.weight} onChange={handleInputChange}/></div>
                        <div className="form-group" style={{gridColumn: '1 / -1'}}><label className="required" htmlFor="activity">กิจกรรม</label>
                            <select id="activity" value={formData.activity} onChange={handleInputChange}>
                                <option>-- เลือกกิจกรรม --</option>
                                <option>ไม่ออกกำลังกายหรือออกกำลังกายน้อยมาก</option>
                                <option>ออกกำลังกาย 1-3 วัน /สัปดาห์</option>
                                <option>ออกกำลังกาย 3-5 วัน /สัปดาห์</option>
                                <option>ออกกำลังกาย 6-7 วัน /สัปดาห์</option>
                                <option>ออกกำลังกายหนักมากเป็นนักกีฬา</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn btn-outline" onClick={() => navigateTo(PAGES.HOME)}>ยกเลิก</button>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>{isSubmitting ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const KnowledgeAssessmentPage = ({ navigateTo }) => {
    const [formData, setFormData] = useState({
        evaluation_date: new Date().toISOString().split('T')[0],
        full_name: '',
        house_no: '',
        moo: '',
        sub_district: '',
        district: '',
        province: '',
        q1: null,
        q2: null,
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { id, value, name, type } = e.target;
        if (type === 'radio') {
            setFormData({ ...formData, [name]: value });
        } else {
            setFormData({ ...formData, [id || name]: value });
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const { error } = await supabase.from('knowledge_assessments').insert([formData]);
        setIsSubmitting(false);
        if (error) {
            console.error('Error submitting assessment:', error);
            alert('เกิดข้อผิดพลาดในการส่งแบบประเมิน: ' + (error.message || JSON.stringify(error)));
        } else {
            alert('ส่งแบบประเมินสำเร็จ!');
            navigateTo(PAGES.HOME);
        }
    };

    return (
        <div className="container">
            <div className="page-container">
                <PageHeader title="แบบประเมินความรอบรู้ด้านสุขภาพและพฤติกรรมสุขภาพ" subtitle="สำหรับประชาชนวัยทำงาน ในหมู่บ้านปรับเปลี่ยนพฤติกรรมสุขภาพ" />
                 <form onSubmit={handleSubmit}>
                    <div className="form-grid" style={{alignItems: 'flex-end'}}>
                        <div className="form-group">
                            <label>วันที่ประเมิน</label>
                            <input type="date" id="evaluation_date" value={formData.evaluation_date} onChange={handleInputChange}/>
                        </div>
                         <div className="form-group">
                            <label className="required">ชื่อ - สกุล</label>
                            <input type="text" id="full_name" placeholder="กรอกชื่อ-สกุล" value={formData.full_name} onChange={handleInputChange} required />
                        </div>
                    </div>
                    <div className="form-grid">
                         <div className="form-group">
                            <label className="required">บ้านเลขที่</label>
                            <input type="text" id="house_no" value={formData.house_no} onChange={handleInputChange} required />
                        </div>
                         <div className="form-group">
                            <label>หมู่</label>
                            <input type="text" id="moo" value={formData.moo} onChange={handleInputChange} />
                        </div>
                         <div className="form-group">
                            <label>ตำบล</label>
                            <input type="text" id="sub_district" value={formData.sub_district} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>อำเภอ</label>
                            <input type="text" id="district" value={formData.district} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>จังหวัด</label>
                            <input type="text" id="province" value={formData.province} onChange={handleInputChange} />
                        </div>
                    </div>
                    
                    <h2 className="form-section-header">คำถามประเมิน</h2>
                    <div className="form-group">
                        <label>ด้านที่ 1: ความรู้พื้นฐานด้านสุขภาพ</label>
                        <div className="radio-group">
                            <label><input type="radio" name="q1" value="ดีมาก" onChange={handleInputChange} /> ดีมาก</label>
                            <label><input type="radio" name="q1" value="ดี" onChange={handleInputChange} /> ดี</label>
                            <label><input type="radio" name="q1" value="ปานกลาง" onChange={handleInputChange} /> ปานกลาง</label>
                        </div>
                    </div>
                     <div className="form-group">
                        <label>ด้านที่ 2: การเข้าถึงข้อมูลสุขภาพ</label>
                        <div className="radio-group">
                            <label><input type="radio" name="q2" value="ดีมาก" onChange={handleInputChange} /> ดีมาก</label>
                            <label><input type="radio" name="q2" value="ดี" onChange={handleInputChange} /> ดี</label>
                            <label><input type="radio" name="q2" value="ปานกลาง" onChange={handleInputChange} /> ปานกลาง</label>
                        </div>
                    </div>
                    {/* Add more questions as needed */}
                     <div className="form-actions">
                        <button type="button" className="btn btn-outline" onClick={() => navigateTo(PAGES.HOME)}>ยกเลิก</button>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'กำลังส่ง...' : 'ส่งแบบประเมิน'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const IsItTrueDoctorPage = ({ navigateTo }) => (
     <div className="container">
        <div className="page-container">
            <PageHeader title="จริงไหมหมอ..!" subtitle="ติดต่อสอบถามข้อมูลสุขภาพกับหน่วยบริการสาธารณสุขในพื้นที่" />
             <div className="table-responsive">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>หน่วยบริการสาธารณสุข</th>
                            <th>Line Official</th>
                            <th>การดำเนินการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {healthUnits.map((unit, index) => (
                            <tr key={unit.id}>
                                <td>{index + 1}</td>
                                <td>รพ.สต.{unit.name.replace('รพ.สต.', '')} <br/><small>หน่วยบริการสาธารณสุขประจำชุมชน</small></td>
                                <td><span style={{color: 'green', fontWeight: 'bold'}}>{unit.lineId}</span></td>
                                <td><a href="#" className="btn btn-primary" style={{padding: '0.5rem 1rem'}}><i className="fa-solid fa-square-arrow-up-right"></i> ติดต่อ</a></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
);

const InnovationAssessmentPage = ({ navigateTo }) => {
    const [formData, setFormData] = useState({
        satisfaction: null,
        suggestions: '',
        evaluation_date: new Date().toISOString().split('T')[0],
        evaluator_name: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { id, name, value, type } = e.target;
        if (type === 'radio') {
            setFormData({ ...formData, [name]: value });
        } else {
            setFormData({ ...formData, [id || name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.satisfaction) {
            alert('กรุณาเลือกระดับความพึงพอใจ');
            return;
        }
        setIsSubmitting(true);
        const { error } = await supabase.from('innovation_assessments').insert([formData]);
        setIsSubmitting(false);

        if (error) {
            console.error('Error submitting innovation assessment:', error);
            alert('เกิดข้อผิดพลาดในการส่งแบบประเมิน: ' + (error.message || JSON.stringify(error)));
        } else {
            alert('ขอบคุณสำหรับความคิดเห็น! ส่งแบบประเมินสำเร็จ');
            navigateTo(PAGES.HOME);
        }
    };

    return (
        <div className="container">
            <div className="page-container">
                 <div style={{textAlign: 'center', marginBottom: '2rem', backgroundColor: '#fffbe6', padding: '1rem', borderRadius: 'var(--border-radius)'}}>
                    <h1 style={{color: '#f59e0b'}}><i className="fa-solid fa-star"></i> ประเมินความพึงพอใจ</h1>
                    <p>ท่านมีความพึงพอใจต่อการใช้ นวัตกรรม Health Station @ ท่าแซะ อยู่ในระดับใด ?</p>
                </div>
                <form onSubmit={handleSubmit}>
                     <div className="form-group">
                        <label className="required">ท่านมีความพึงพอใจต่อการใช้ นวัตกรรม Health Station @ ท่าแซะ อยู่ในระดับใด ?</label>
                        <div className="radio-group">
                            <label><input type="radio" name="satisfaction" value="พอใจมากที่สุด" onChange={handleInputChange} /> พอใจมากที่สุด</label>
                            <label><input type="radio" name="satisfaction" value="พอใจมาก" onChange={handleInputChange} /> พอใจมาก</label>
                            <label><input type="radio" name="satisfaction" value="พอใจปานกลาง" onChange={handleInputChange} /> พอใจปานกลาง</label>
                            <label><input type="radio" name="satisfaction" value="พอใจน้อย" onChange={handleInputChange} /> พอใจน้อย</label>
                            <label><input type="radio" name="satisfaction" value="พอใจน้อยที่สุด" onChange={handleInputChange} /> พอใจน้อยที่สุด</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="suggestions">ข้อเสนอแนะ</label>
                        <textarea id="suggestions" name="suggestions" rows={4} placeholder="ข้อเสนอแนะเพิ่มเติมเพื่อการพัฒนาที่ดีขึ้น (ไม่บังคับ)" value={formData.suggestions} onChange={handleInputChange}></textarea>
                    </div>
                    <div className="form-grid">
                        <div className="form-group">
                            <label>วันที่ประเมิน</label>
                            <input type="date" id="evaluation_date" value={formData.evaluation_date} onChange={handleInputChange} />
                        </div>
                        <div className="form-group">
                            <label>ลงชื่อผู้ประเมิน (ไม่บังคับ)</label>
                            <input type="text" id="evaluator_name" name="evaluator_name" value={formData.evaluator_name} onChange={handleInputChange}/>
                        </div>
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn btn-outline" onClick={() => navigateTo(PAGES.HOME)}>ยกเลิก</button>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'กำลังส่ง...' : 'ส่งแบบประเมิน'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const KnowledgeBasePage = ({ navigateTo }) => {
    const [knowledgeItems, setKnowledgeItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchKnowledgeItems = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('knowledge_base')
                .select('*');
            
            if (error) {
                console.error('Error fetching knowledge base:', error);
                alert('ไม่สามารถโหลดข้อมูลคลังความรู้ได้');
            } else {
                setKnowledgeItems(data);
            }
            setLoading(false);
        };

        fetchKnowledgeItems();
    }, []);

    if (loading) {
        return <div className="container"><p style={{textAlign: 'center', padding: '2rem'}}>กำลังโหลดข้อมูล...</p></div>;
    }

    return (
        <div className="container">
            <div className="page-container">
                <PageHeader title="คลังความรู้สุขภาพ" subtitle="รวบรวมบทความและสื่อความรู้ด้านสุขภาพและโภชนาการ" />
                <div className="knowledge-grid">
                    {knowledgeItems.map(item => (
                        <div key={item.id} className="knowledge-card">
                            <img src={item.img || 'https://i.imgur.com/v826Bq6.jpg'} alt={item.title} />
                            <div className="knowledge-card-content">
                                <span className={`knowledge-card-tag ${
                                    item.category === 'แม่และเด็ก' ? 'tag-mom-child' :
                                    item.category === 'วัยเรียนวัยรุ่น' ? 'tag-teen' : 'tag-nutrition'
                                }`}>{item.category}</span>
                                <h3>{item.title}</h3>
                                <a href={item.link}>อ่านเพิ่มเติม →</a>
                            </div>
                        </div>
                    ))}
                </div>
                {/* Pagination would go here */}
            </div>
        </div>
    );
};

const LoginPage = ({ navigateTo, handleLogin }) => (
     <div className="container" style={{maxWidth: '500px'}}>
        <div className="page-container">
            <PageHeader title="สำหรับเจ้าหน้าที่" subtitle="กรุณาเข้าสู่ระบบเพื่อจัดการข้อมูล" />
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <div className="form-group">
                    <label htmlFor="username">ชื่อผู้ใช้</label>
                    <input type="text" id="username" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">รหัสผ่าน</label>
                    <input type="password" id="password" required />
                </div>
                <div className="form-actions">
                    <button type="button" className="btn btn-outline" onClick={() => navigateTo(PAGES.HOME)}>กลับหน้าหลัก</button>
                    <button type="submit" className="btn btn-primary">เข้าสู่ระบบ</button>
                </div>
            </form>
            <div className="login-extra-links">
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(PAGES.REGISTER); }}>ลงทะเบียน</a>
                <span>|</span>
                <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(PAGES.CARB_COUNTER); }}>กรอกข้อมูลโดยไม่ต้องเข้าสู่ระบบ</a>
            </div>
        </div>
    </div>
);

const RegisterPage = ({ navigateTo }) => {
    const [formData, setFormData] = useState({
        title: '',
        full_name: '',
        id_card: '',
        username: '',
        password: '',
        confirm_password: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirm_password) {
            alert('รหัสผ่านและการยืนยันรหัสผ่านไม่ตรงกัน');
            return;
        }
        setIsSubmitting(true);
        const { error } = await supabase
            .from('users')
            .insert([{
                title: formData.title,
                full_name: formData.full_name,
                id_card: formData.id_card,
                username: formData.username,
                password: formData.password, // In a real app, this should be hashed!
                status: 'รอตรวจสอบ',
            }]);
        
        setIsSubmitting(false);

        if (error) {
            console.error('Registration error:', error);
            alert('เกิดข้อผิดพลาดในการลงทะเบียน: ' + (error.message || JSON.stringify(error)));
        } else {
            alert('ลงทะเบียนสำเร็จ! กรุณารอการตรวจสอบจากผู้ดูแลระบบ');
            navigateTo(PAGES.LOGIN);
        }
    };

    return (
        <div className="container" style={{maxWidth: '500px'}}>
            <div className="page-container">
                <PageHeader title="ลงทะเบียน" subtitle="สร้างบัญชีผู้ใช้ใหม่สำหรับเจ้าหน้าที่" />
                <form onSubmit={handleSubmit}>
                     <div className="form-group">
                        <label className="required" htmlFor="title">คำนำหน้า</label>
                        <select id="title" value={formData.title} onChange={handleInputChange} required>
                            <option value="">-- เลือกคำนำหน้า --</option>
                            <option>นาย</option>
                            <option>นางสาว</option>
                            <option>นาง</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="required" htmlFor="full_name">ชื่อ-สกุล</label>
                        <input type="text" id="full_name" value={formData.full_name} onChange={handleInputChange} required />
                    </div>
                     <div className="form-group">
                        <label className="required" htmlFor="id_card">เลขประจำตัวประชาชน</label>
                        <input type="text" id="id_card" value={formData.id_card} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label className="required" htmlFor="username">ชื่อผู้ใช้</label>
                        <input type="text" id="username" value={formData.username} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label className="required" htmlFor="password">รหัสผ่าน</label>
                        <input type="password" id="password" value={formData.password} onChange={handleInputChange} required />
                    </div>
                     <div className="form-group">
                        <label className="required" htmlFor="confirm_password">ยืนยันรหัสผ่าน</label>
                        <input type="password" id="confirm_password" value={formData.confirm_password} onChange={handleInputChange} required />
                    </div>
                    <div className="form-actions">
                        <button type="button" className="btn btn-outline" onClick={() => navigateTo(PAGES.LOGIN)}>กลับไปหน้าเข้าสู่ระบบ</button>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                            {isSubmitting ? 'กำลังลงทะเบียน...' : 'ลงทะเบียน'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};


// --- Admin Pages ---
const AdminDashboard = ({ navigateTo }) => (
    <>
        <div className="admin-card-grid">
            <div className="admin-card">
                <div>
                    <div className="admin-card-header">
                        <div className="icon"><i className="fa-solid fa-users"></i></div>
                        <h3>การจัดการผู้ใช้</h3>
                    </div>
                    <div className="admin-card-body">
                        <p>1,234</p>
                        <span>ผู้ใช้ในระบบ</span>
                    </div>
                </div>
                <div className="admin-card-footer">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(PAGES.ADMIN_USER_MANAGEMENT); }}>จัดการ →</a>
                </div>
            </div>
            <div className="admin-card">
                <div>
                    <div className="admin-card-header">
                        <div className="icon"><i className="fa-solid fa-map-location-dot"></i></div>
                        <h3>การจัดการ Health Station</h3>
                    </div>
                    <div className="admin-card-body">
                        <p>15</p>
                        <span>จุดบริการ</span>
                    </div>
                </div>
                 <div className="admin-card-footer">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(PAGES.ADMIN_HEALTH_STATION_MANAGEMENT); }}>จัดการ →</a>
                </div>
            </div>
            <div className="admin-card">
                <div>
                    <div className="admin-card-header">
                        <div className="icon"><i className="fa-solid fa-file-lines"></i></div>
                        <h3>ทะเบียนการคัดกรอง</h3>
                    </div>
                    <div className="admin-card-body">
                        <p>5,678</p>
                        <span>รายการ</span>
                    </div>
                </div>
                 <div className="admin-card-footer">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(PAGES.ADMIN_SCREENING_DASHBOARD); }}>จัดการ →</a>
                </div>
            </div>
            <div className="admin-card">
                <div>
                    <div className="admin-card-header">
                        <div className="icon"><i className="fa-solid fa-clipboard-check"></i></div>
                        <h3>ประเมินความรอบรู้</h3>
                    </div>
                    <div className="admin-card-body">
                        <p>8,910</p>
                        <span>ผลลัพธ์</span>
                    </div>
                </div>
                 <div className="admin-card-footer">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(PAGES.ADMIN_KNOWLEDGE_ASSESSMENT_RESULTS); }}>จัดการ →</a>
                </div>
            </div>
            <div className="admin-card">
                <div>
                    <div className="admin-card-header">
                        <div className="icon"><i className="fa-solid fa-star-half-stroke"></i></div>
                        <h3>ประเมินนวัตกรรม</h3>
                    </div>
                    <div className="admin-card-body">
                        <p>4,321</p>
                        <span>ผลลัพธ์</span>
                    </div>
                </div>
                 <div className="admin-card-footer">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(PAGES.ADMIN_INNOVATION_ASSESSMENT_RESULTS); }}>จัดการ →</a>
                </div>
            </div>
             <div className="admin-card">
                <div>
                    <div className="admin-card-header">
                        <div className="icon"><i className="fa-solid fa-chart-line"></i></div>
                        <h3>รายงาน</h3>
                    </div>
                    <div className="admin-card-body">
                        <p>25</p>
                        <span>รายงานสรุป</span>
                    </div>
                </div>
                 <div className="admin-card-footer">
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(PAGES.ADMIN_REPORTS); }}>จัดการ →</a>
                </div>
            </div>
        </div>
    </>
);

const AdminUserManagement = ({ navigateTo }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('users').select('*').order('created_at', { ascending: false });
        if (error) {
            console.error('Error fetching users:', error);
            alert('ไม่สามารถโหลดข้อมูลผู้ใช้ได้');
        } else {
            setUsers(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDelete = async (userId) => {
        if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้นี้?')) {
            const { error } = await supabase.from('users').delete().eq('id', userId);
            if (error) {
                alert('เกิดข้อผิดพลาดในการลบผู้ใช้: ' + error.message);
            } else {
                alert('ลบผู้ใช้สำเร็จ');
                fetchUsers(); // Refresh the list
            }
        }
    };

    if (loading) {
        return <p style={{ textAlign: 'center', padding: '2rem' }}>กำลังโหลดข้อมูล...</p>;
    }

    return (
        <>
            <div className="table-toolbar">
                <div className="search-filter">
                    <input type="text" placeholder="ค้นหา..." />
                    <button className="btn"><i className="fa-solid fa-filter"></i> กรอง</button>
                </div>
                <button className="btn btn-primary" onClick={() => navigateTo(PAGES.ADMIN_ADD_USER)}>
                    <i className="fa-solid fa-plus"></i> เพิ่มใหม่
                </button>
            </div>
            <div className="table-responsive">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>คำนำหน้า</th>
                            <th>ชื่อ-สกุล</th>
                            <th>เลขประจำตัวประชาชน</th>
                            <th>สถานะการใช้งาน</th>
                            <th>การดำเนินการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.title}</td>
                                <td>{user.full_name}</td>
                                <td>{user.id_card}</td>
                                <td>
                                    <span className={`status ${user.status === 'รอตรวจสอบ' ? 'status-pending' : 'status-normal'}`}>
                                        {user.status}
                                    </span>
                                </td>
                                <td className="table-actions">
                                    <button className="btn btn-outline" style={{padding: '0.25rem 0.5rem', marginRight: '0.5rem'}}>ดู/แก้ไข</button>
                                    <button className="btn btn-danger" style={{padding: '0.25rem 0.5rem'}} onClick={() => handleDelete(user.id)}>ลบ</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <button className="btn btn-outline">&lt; ก่อนหน้า</button>
                <button className="btn btn-primary">1</button>
                <button className="btn btn-outline">ถัดไป &gt;</button>
            </div>
        </>
    );
};

const AdminAddUserPage = ({ navigateTo }) => {
    const [formData, setFormData] = useState({
        title: '',
        full_name: '',
        id_card: '',
        username: '',
        password: '',
        status: 'ใช้งานได้',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const { error } = await supabase
            .from('users')
            .insert([{
                title: formData.title,
                full_name: formData.full_name,
                id_card: formData.id_card,
                username: formData.username,
                password: formData.password, // In a real app, this should be hashed!
                status: formData.status,
            }]);
        
        setIsSubmitting(false);

        if (error) {
            console.error('Add user error:', error);
            alert('เกิดข้อผิดพลาดในการเพิ่มผู้ใช้: ' + error.message);
        } else {
            alert('เพิ่มผู้ใช้ใหม่สำเร็จ!');
            navigateTo(PAGES.ADMIN_USER_MANAGEMENT);
        }
    };

    return (
        <div className="page-container" style={{maxWidth: '700px', margin: '0 auto'}}>
             <form onSubmit={handleSubmit}>
                 <div className="form-group">
                    <label className="required" htmlFor="title">คำนำหน้า</label>
                    <select id="title" value={formData.title} onChange={handleInputChange} required>
                        <option value="">-- เลือกคำนำหน้า --</option>
                        <option>นาย</option>
                        <option>นางสาว</option>
                        <option>นาง</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="required" htmlFor="full_name">ชื่อ-สกุล</label>
                    <input type="text" id="full_name" value={formData.full_name} onChange={handleInputChange} required />
                </div>
                 <div className="form-group">
                    <label className="required" htmlFor="id_card">เลขประจำตัวประชาชน</label>
                    <input type="text" id="id_card" value={formData.id_card} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label className="required" htmlFor="username">ชื่อผู้ใช้</label>
                    <input type="text" id="username" value={formData.username} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label className="required" htmlFor="password">รหัสผ่าน</label>
                    <input type="password" id="password" value={formData.password} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label className="required" htmlFor="status">สถานะการใช้งาน</label>
                    <select id="status" value={formData.status} onChange={handleInputChange} required>
                        <option value="ใช้งานได้">ใช้งานได้</option>
                        <option value="รอตรวจสอบ">รอตรวจสอบ</option>
                    </select>
                </div>
                <div className="form-actions">
                    <button type="button" className="btn btn-outline" onClick={() => navigateTo(PAGES.ADMIN_USER_MANAGEMENT)}>ยกเลิก</button>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกผู้ใช้'}
                    </button>
                </div>
            </form>
        </div>
    );
};

const AdminHealthStationManagement = ({ navigateTo }) => {
    const [stations, setStations] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStations = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('health_stations').select('*').order('created_at', { ascending: false });
        if (error) {
            console.error('Error fetching stations:', error);
            alert('ไม่สามารถโหลดข้อมูล Health Station ได้');
        } else {
            setStations(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchStations();
    }, []);

    const handleDelete = async (stationId) => {
        if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบ Health Station นี้?')) {
            const { error } = await supabase.from('health_stations').delete().eq('id', stationId);
            if (error) {
                alert('เกิดข้อผิดพลาดในการลบ: ' + error.message);
            } else {
                alert('ลบ Health Station สำเร็จ');
                fetchStations(); // Refresh list
            }
        }
    };
    
    if (loading) {
        return <p style={{ textAlign: 'center', padding: '2rem' }}>กำลังโหลดข้อมูล...</p>;
    }

    return (
        <>
            <div className="table-toolbar">
                <div className="search-filter">
                    <input type="text" placeholder="ค้นหา..." />
                    <button className="btn"><i className="fa-solid fa-filter"></i> กรอง</button>
                </div>
                <button className="btn btn-primary" onClick={() => navigateTo(PAGES.ADMIN_ADD_HEALTH_STATION)}><i className="fa-solid fa-plus"></i> เพิ่มข้อมูล</button>
            </div>
            <div className="table-responsive">
                <table className="data-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>รหัสหน่วยบริการ</th>
                            <th>ชื่อจุดบริการ Health Station</th>
                            <th>สถานะการให้บริการ</th>
                            <th>การดำเนินการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stations.map((station, index) => (
                             <tr key={station.id}>
                                <td>{index + 1}</td>
                                <td>{station.service_code || 'N/A'}</td>
                                <td>{station.name}</td>
                                <td>
                                    <span className={`status ${station.status === 'เปิดให้บริการ' ? 'status-open' : 'status-closed'}`}>
                                        {station.status}
                                    </span>
                                </td>
                                <td className="table-actions">
                                    <button className="btn btn-outline" style={{padding: '0.25rem 0.5rem', marginRight: '0.5rem'}}>ดู/แก้ไข</button>
                                    <button className="btn btn-danger" style={{padding: '0.25rem 0.5rem'}} onClick={() => handleDelete(station.id)}>ลบ</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             <div className="pagination">
                <button className="btn btn-outline">&lt; ก่อนหน้า</button>
                <button className="btn btn-primary">1</button>
                <button className="btn btn-outline">ถัดไป &gt;</button>
            </div>
        </>
    );
};

const AdminAddHealthStationPage = ({ navigateTo }) => {
    const [formData, setFormData] = useState({
        name: '',
        service_code: '',
        status: 'เปิดให้บริการ',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const { error } = await supabase.from('health_stations').insert([formData]);
        setIsSubmitting(false);

        if (error) {
            console.error('Add Health Station error:', error);
            alert('เกิดข้อผิดพลาดในการเพิ่ม Health Station: ' + error.message);
        } else {
            alert('เพิ่ม Health Station ใหม่สำเร็จ!');
            navigateTo(PAGES.ADMIN_HEALTH_STATION_MANAGEMENT);
        }
    };

    return (
        <div className="page-container" style={{ maxWidth: '700px', margin: '0 auto' }}>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="required" htmlFor="name">ชื่อจุดบริการ Health Station</label>
                    <input type="text" id="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="service_code">รหัสหน่วยบริการ</label>
                    <input type="text" id="service_code" value={formData.service_code} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label className="required" htmlFor="status">สถานะการให้บริการ</label>
                    <select id="status" value={formData.status} onChange={handleInputChange} required>
                        <option value="เปิดให้บริการ">เปิดให้บริการ</option>
                        <option value="ปิดให้บริการ">ปิดให้บริการ</option>
                    </select>
                </div>
                <div className="form-actions">
                    <button type="button" className="btn btn-outline" onClick={() => navigateTo(PAGES.ADMIN_HEALTH_STATION_MANAGEMENT)}>ยกเลิก</button>
                    <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                        {isSubmitting ? 'กำลังบันทึก...' : 'บันทึก'}
                    </button>
                </div>
            </form>
        </div>
    );
};

// --- Generic Admin Page Components ---
const GenericAdminPage = ({
    navigateTo,
    pageTitle,
    tableName,
    columns,
    addPage,
    renderRow
}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ search: '', result: '', startDate: '', endDate: '', station: '' });

    const fetchData = async () => {
        setLoading(true);
        let query = supabase.from(tableName).select('*').order('created_at', { ascending: false });

        if (filters.search) {
            query = query.or(`full_name.ilike.%${filters.search}%,id_card.ilike.%${filters.search}%`);
        }
        
        const { data, error } = await query;
        
        if (error) {
            console.error(`Error fetching ${tableName}:`, error);
            alert(`ไม่สามารถโหลดข้อมูลได้: ${error.message || JSON.stringify(error)}`);
        } else {
            setData(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []); 

    const handleDelete = async (id) => {
        if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?')) {
            const { error } = await supabase.from(tableName).delete().eq('id', id);
            if (error) {
                alert('เกิดข้อผิดพลาดในการลบ: ' + error.message);
            } else {
                alert('ลบข้อมูลสำเร็จ');
                fetchData();
            }
        }
    };
    
    const handleFilterChange = (e) => {
        setFilters({...filters, [e.target.name]: e.target.value });
    };

    if (loading) {
        return <p style={{ textAlign: 'center', padding: '2rem' }}>กำลังโหลดข้อมูล...</p>;
    }

    return (
        <>
            <div className="table-toolbar">
                <div className="search-filter">
                    <input type="text" name="search" placeholder="ค้นหา ชื่อ-สกุล, เลข ปชช..." onChange={handleFilterChange}/>
                    <input type="date" name="startDate" onChange={handleFilterChange} />
                    <span>ถึง</span>
                    <input type="date" name="endDate" onChange={handleFilterChange} />
                    <button className="btn" onClick={fetchData}><i className="fa-solid fa-search"></i> ค้นหา</button>
                </div>
                {addPage && (
                    <button className="btn btn-primary" onClick={() => navigateTo(addPage)}>
                        <i className="fa-solid fa-plus"></i> เพิ่มใหม่
                    </button>
                )}
            </div>
            <div className="table-responsive">
                <table className="data-table">
                    <thead>
                        <tr>
                            {columns.map(col => <th key={col}>{col}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? data.map((item, index) => renderRow(item, index, handleDelete)) : <tr><td colSpan={columns.length} style={{textAlign: 'center'}}>ไม่พบข้อมูล</td></tr>}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                <button className="btn btn-outline">&lt; ก่อนหน้า</button>
                <button className="btn btn-primary">1</button>
                <button className="btn btn-outline">ถัดไป &gt;</button>
            </div>
        </>
    );
};


// --- Screening Dashboard ---
const AdminScreeningDashboard = ({ navigateTo }) => (
    <div className="screening-card-grid">
        <div className="screening-card color-1" onClick={() => navigateTo(PAGES.ADMIN_SCREENING_BMI)}>
            <div className="icon"><i className="fa-solid fa-person"></i></div>
            <div><h3>ดัชนีมวลกาย (BMI)</h3><p>จัดการข้อมูลการคัดกรองดัชนีมวลกาย</p></div>
        </div>
         <div className="screening-card color-2" onClick={() => navigateTo(PAGES.ADMIN_SCREENING_WAIST)}>
            <div className="icon"><i className="fa-solid fa-ruler-horizontal"></i></div>
            <div><h3>รอบเอว</h3><p>จัดการข้อมูลการคัดกรองรอบเอว</p></div>
        </div>
        <div className="screening-card color-3" onClick={() => navigateTo(PAGES.ADMIN_SCREENING_BP)}>
            <div className="icon"><i className="fa-solid fa-heart-pulse"></i></div>
            <div><h3>ความดันโลหิต</h3><p>จัดการข้อมูลการคัดกรองความดันโลหิต</p></div>
        </div>
        <div className="screening-card color-4" onClick={() => navigateTo(PAGES.ADMIN_SCREENING_SUGAR)}>
            <div className="icon"><i className="fa-solid fa-droplet"></i></div>
            <div><h3>น้ำตาลในเลือด</h3><p>จัดการข้อมูลการคัดกรองระดับน้ำตาล</p></div>
        </div>
         <div className="screening-card color-5" onClick={() => navigateTo(PAGES.ADMIN_SCREENING_SMOKING)}>
            <div className="icon"><i className="fa-solid fa-smoking"></i></div>
            <div><h3>การสูบบุหรี่</h3><p>จัดการข้อมูลการคัดกรองการสูบบุหรี่</p></div>
        </div>
        <div className="screening-card color-6" onClick={() => navigateTo(PAGES.ADMIN_SCREENING_ALCOHOL)}>
            <div className="icon"><i className="fa-solid fa-wine-glass"></i></div>
            <div><h3>การดื่มสุรา</h3><p>จัดการข้อมูลการคัดกรองการดื่มสุรา</p></div>
        </div>
        <div className="screening-card color-7" onClick={() => navigateTo(PAGES.ADMIN_SCREENING_DEPRESSION)}>
            <div className="icon"><i className="fa-solid fa-brain"></i></div>
            <div><h3>ภาวะซึมเศร้า</h3><p>จัดการข้อมูลการคัดกรองภาวะซึมเศร้า</p></div>
        </div>
    </div>
);


const AdminKnowledgeAssessmentResults = (props) => (
    <GenericAdminPage
        {...props}
        tableName="knowledge_assessments"
        columns={['#', 'วันที่ประเมิน', 'ชื่อ-สกุล', 'บ้านเลขที่', 'หมู่', 'ด้านที่ 1', 'ด้านที่ 2', 'การดำเนินการ']}
        renderRow={(item, index, handleDelete) => (
            <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{new Date(item.evaluation_date).toLocaleDateString('th-TH')}</td>
                <td>{item.full_name}</td>
                <td>{item.house_no}</td>
                <td>{item.moo}</td>
                <td>{item.q1}</td>
                <td>{item.q2}</td>
                <td className="table-actions">
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}><i className="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        )}
    />
);

const AdminInnovationAssessmentResults = (props) => (
    <GenericAdminPage
        {...props}
        tableName="innovation_assessments"
        columns={['#', 'วันที่ประเมิน', 'ผลการประเมิน', 'ข้อเสนอแนะ', 'ชื่อผู้ประเมิน', 'การดำเนินการ']}
        renderRow={(item, index, handleDelete) => (
            <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{new Date(item.evaluation_date).toLocaleDateString('th-TH')}</td>
                <td>{item.satisfaction}</td>
                <td>{item.suggestions || '-'}</td>
                <td>{item.evaluator_name || '-'}</td>
                 <td className="table-actions">
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}><i className="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        )}
    />
);


// --- Specific Add Screening Forms with Logic ---

const ScreeningFormLayout = ({ navigateTo, successPage, handleSubmit, isSubmitting, pageTitle, children, handleInputChange, formData }) => (
     <div className="page-container" style={{maxWidth: '800px', margin: '0 auto'}}>
        <form onSubmit={handleSubmit}>
            <h2 className="form-section-header">ข้อมูลผู้รับการคัดกรอง</h2>
            <div className="form-grid">
                <div className="form-group"><label className="required">วันที่คัดกรอง</label><input type="date" id="screening_date" value={formData.screening_date} onChange={handleInputChange} required /></div>
                <div className="form-group"><label className="required">คำนำหน้า</label><select id="title" value={formData.title} onChange={handleInputChange} required><option value="">--เลือก--</option><option>นาย</option><option>นาง</option><option>นางสาว</option></select></div>
                <div className="form-group"><label className="required">ชื่อ-สกุล</label><input type="text" id="full_name" value={formData.full_name} onChange={handleInputChange} required /></div>
                <div className="form-group"><label>เลขประจำตัวประชาชน</label><input type="text" id="id_card" value={formData.id_card} onChange={handleInputChange} /></div>
                <div className="form-group"><label className="required">สถานีที่คัดกรอง</label><input type="text" id="station" value={formData.station} onChange={handleInputChange} required /></div>
            </div>
            <h2 className="form-section-header">{pageTitle}</h2>
            {children}
            <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={() => navigateTo(successPage)}>ยกเลิก</button>
                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'กำลังบันทึก...' : 'บันทึกข้อมูล'}
                </button>
            </div>
        </form>
    </div>
);

const AdminAddScreeningBmiPage = ({ navigateTo }) => {
    const [formData, setFormData] = useState({ screening_date: new Date().toISOString().split('T')[0], title: '', full_name: '', id_card: '', station: '', weight: '', height: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const heightM = parseFloat(formData.height) / 100;
        const weightKg = parseFloat(formData.weight);
        // FIX: Calculate BMI as a number for comparison to avoid type errors.
        const bmiValue = weightKg / (heightM * heightM);
        const bmi = bmiValue.toFixed(2);
        let interpretation = '';
        if (bmiValue < 18.5) interpretation = 'ผอม';
        else if (bmiValue < 23) interpretation = 'ร่างกายสมส่วน';
        else if (bmiValue < 25) interpretation = 'ท้วม';
        else if (bmiValue < 30) interpretation = 'อ้วน หรือ โรคอ้วนระดับที่ 2';
        else interpretation = 'อ้วนอันตราย หรือ โรคอ้วนระดับที่ 3';

        const dataToInsert = { ...formData, bmi, interpretation, weight: weightKg, height: parseFloat(formData.height) };
        const { error } = await supabase.from('screening_bmi').insert([dataToInsert]);
        setIsSubmitting(false);

        if (error) { alert(`เกิดข้อผิดพลาด: ${error.message}`); } 
        else { alert('บันทึกข้อมูลสำเร็จ!'); navigateTo(PAGES.ADMIN_SCREENING_BMI); }
    };

    return (
        <ScreeningFormLayout {...{ navigateTo, handleSubmit, isSubmitting, formData, handleInputChange }} successPage={PAGES.ADMIN_SCREENING_BMI} pageTitle="ข้อมูลดัชนีมวลกาย">
            <div className="form-grid">
                <div className="form-group"><label className="required">น้ำหนัก (kg)</label><input type="number" id="weight" value={formData.weight} onChange={handleInputChange} required /></div>
                <div className="form-group"><label className="required">ส่วนสูง (cm)</label><input type="number" id="height" value={formData.height} onChange={handleInputChange} required /></div>
            </div>
        </ScreeningFormLayout>
    );
};

const AdminAddScreeningWaistPage = ({ navigateTo }) => {
    const [formData, setFormData] = useState({ screening_date: new Date().toISOString().split('T')[0], title: '', full_name: '', id_card: '', station: '', waist: '', height: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const interpretation = parseFloat(formData.waist) > (parseFloat(formData.height) / 2) ? 'เกินเกณฑ์' : 'ไม่เกินเกณฑ์';
        const dataToInsert = { ...formData, interpretation, waist: parseFloat(formData.waist), height: parseFloat(formData.height) };
        const { error } = await supabase.from('screening_waist').insert([dataToInsert]);
        setIsSubmitting(false);
        if (error) { alert(`เกิดข้อผิดพลาด: ${error.message}`); } 
        else { alert('บันทึกข้อมูลสำเร็จ!'); navigateTo(PAGES.ADMIN_SCREENING_WAIST); }
    };

    return (
        <ScreeningFormLayout {...{ navigateTo, handleSubmit, isSubmitting, formData, handleInputChange }} successPage={PAGES.ADMIN_SCREENING_WAIST} pageTitle="ข้อมูลรอบเอว">
            <div className="form-grid">
                <div className="form-group"><label className="required">รอบเอว (cm)</label><input type="number" id="waist" value={formData.waist} onChange={handleInputChange} required /></div>
                <div className="form-group"><label className="required">ส่วนสูง (cm)</label><input type="number" id="height" value={formData.height} onChange={handleInputChange} required /></div>
            </div>
        </ScreeningFormLayout>
    );
};

const AdminAddScreeningBpPage = ({ navigateTo }) => {
    const [formData, setFormData] = useState({ screening_date: new Date().toISOString().split('T')[0], title: '', full_name: '', id_card: '', station: '', systolic: '', diastolic: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const sys = parseInt(formData.systolic);
        const dia = parseInt(formData.diastolic);
        let interpretation = 'ปกติ';
        if ((sys >= 120 && sys <= 139) || (dia >= 80 && dia <= 89)) interpretation = 'กลุ่มเสี่ยง';
        if (sys >= 140 || dia >= 90) interpretation = 'สงสัยป่วย';
        
        const dataToInsert = { ...formData, interpretation, systolic: sys, diastolic: dia };
        const { error } = await supabase.from('screening_bp').insert([dataToInsert]);
        setIsSubmitting(false);
        if (error) { alert(`เกิดข้อผิดพลาด: ${error.message}`); } 
        else { alert('บันทึกข้อมูลสำเร็จ!'); navigateTo(PAGES.ADMIN_SCREENING_BP); }
    };

    return (
        <ScreeningFormLayout {...{ navigateTo, handleSubmit, isSubmitting, formData, handleInputChange }} successPage={PAGES.ADMIN_SCREENING_BP} pageTitle="ข้อมูลความดันโลหิต">
            <div className="form-grid">
                <div className="form-group"><label className="required">ค่าความดันตัวบน (Systolic)</label><input type="number" id="systolic" value={formData.systolic} onChange={handleInputChange} required /></div>
                <div className="form-group"><label className="required">ค่าความดันตัวล่าง (Diastolic)</label><input type="number" id="diastolic" value={formData.diastolic} onChange={handleInputChange} required /></div>
            </div>
        </ScreeningFormLayout>
    );
};

const AdminAddScreeningSugarPage = ({ navigateTo }) => {
    const [formData, setFormData] = useState({ screening_date: new Date().toISOString().split('T')[0], title: '', full_name: '', id_card: '', station: '', sugar_level: '', fasting: 'อด' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const level = parseInt(formData.sugar_level);
        let interpretation = 'ปกติ';
        if (level >= 100 && level <= 125) interpretation = 'กลุ่มเสี่ยง';
        if (level >= 126) interpretation = 'สงสัยป่วย';
        
        const dataToInsert = { ...formData, interpretation, sugar_level: level };
        const { error } = await supabase.from('screening_sugar').insert([dataToInsert]);
        setIsSubmitting(false);
        if (error) { alert(`เกิดข้อผิดพลาด: ${error.message}`); } 
        else { alert('บันทึกข้อมูลสำเร็จ!'); navigateTo(PAGES.ADMIN_SCREENING_SUGAR); }
    };

    return (
        <ScreeningFormLayout {...{ navigateTo, handleSubmit, isSubmitting, formData, handleInputChange }} successPage={PAGES.ADMIN_SCREENING_SUGAR} pageTitle="ข้อมูลระดับน้ำตาลในเลือด">
            <div className="form-grid">
                <div className="form-group"><label className="required">ระดับน้ำตาล (mg/dL)</label><input type="number" id="sugar_level" value={formData.sugar_level} onChange={handleInputChange} required /></div>
                <div className="form-group"><label className="required">การอดอาหาร</label><select id="fasting" value={formData.fasting} onChange={handleInputChange}><option>อด</option><option>ไม่อด</option></select></div>
            </div>
        </ScreeningFormLayout>
    );
};

const AdminAddScreeningSmokingPage = ({ navigateTo }) => {
    const [formData, setFormData] = useState({ screening_date: new Date().toISOString().split('T')[0], title: '', full_name: '', id_card: '', station: '', smoking_status: 'ไม่เคยสูบในช่วงชีวิตที่ผ่านมา' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const interpretation = formData.smoking_status === 'ไม่เคยสูบในช่วงชีวิตที่ผ่านมา' ? 'ไม่มีความเสี่ยง' : 'มีความเสี่ยง';
        const { error } = await supabase.from('screening_smoking').insert([{ ...formData, interpretation }]);
        setIsSubmitting(false);
        if (error) { alert(`เกิดข้อผิดพลาด: ${error.message}`); } 
        else { alert('บันทึกข้อมูลสำเร็จ!'); navigateTo(PAGES.ADMIN_SCREENING_SMOKING); }
    };

    return (
        <ScreeningFormLayout {...{ navigateTo, handleSubmit, isSubmitting, formData, handleInputChange }} successPage={PAGES.ADMIN_SCREENING_SMOKING} pageTitle="ข้อมูลการสูบบุหรี่">
             <div className="form-group"><label className="required">สถานะการสูบบุหรี่</label><select id="smoking_status" value={formData.smoking_status} onChange={handleInputChange}><option>ไม่เคยสูบในช่วงชีวิตที่ผ่านมา</option><option>เคยสูบแต่เลิกมาแล้วมากกว่า 1 เดือน</option><option>ยังคงสูบอยู่</option></select></div>
        </ScreeningFormLayout>
    );
};

const AdminAddScreeningAlcoholPage = ({ navigateTo }) => {
    const [formData, setFormData] = useState({ screening_date: new Date().toISOString().split('T')[0], title: '', full_name: '', id_card: '', station: '', alcohol_status: 'ไม่เคยดื่มเลยในช่วงชีวิตที่ผ่านมา' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const interpretation = formData.alcohol_status === 'ไม่เคยดื่มเลยในช่วงชีวิตที่ผ่านมา' ? 'ไม่มีความเสี่ยง' : 'มีความเสี่ยง';
        const { error } = await supabase.from('screening_alcohol').insert([{ ...formData, interpretation }]);
        setIsSubmitting(false);
        if (error) { alert(`เกิดข้อผิดพลาด: ${error.message}`); } 
        else { alert('บันทึกข้อมูลสำเร็จ!'); navigateTo(PAGES.ADMIN_SCREENING_ALCOHOL); }
    };

    return (
        <ScreeningFormLayout {...{ navigateTo, handleSubmit, isSubmitting, formData, handleInputChange }} successPage={PAGES.ADMIN_SCREENING_ALCOHOL} pageTitle="ข้อมูลการดื่มแอลกอฮอล์">
            <div className="form-group"><label className="required">สถานะการดื่มแอลกอฮอล์</label><select id="alcohol_status" value={formData.alcohol_status} onChange={handleInputChange}><option>ไม่เคยดื่มเลยในช่วงชีวิตที่ผ่านมา</option><option>เคยดื่มแต่ปัจจุบันไม่ได้ดื่มแล้ว</option><option>ยังคงดื่มอยู่</option></select></div>
        </ScreeningFormLayout>
    );
};

const AdminAddScreeningDepressionPage = ({ navigateTo }) => {
    const [formData, setFormData] = useState({ screening_date: new Date().toISOString().split('T')[0], title: '', full_name: '', id_card: '', station: '', q1_sad: 'ไม่มี', q2_bored: 'ไม่มี' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleInputChange = (e) => setFormData({ ...formData, [e.target.id]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const interpretation = formData.q1_sad === 'มี' || formData.q2_bored === 'มี' ? 'มีความเสี่ยง' : 'ไม่มีความเสี่ยง';
        const { error } = await supabase.from('screening_depression').insert([{ ...formData, interpretation }]);
        setIsSubmitting(false);
        if (error) { alert(`เกิดข้อผิดพลาด: ${error.message}`); } 
        else { alert('บันทึกข้อมูลสำเร็จ!'); navigateTo(PAGES.ADMIN_SCREENING_DEPRESSION); }
    };
    
    return (
        <ScreeningFormLayout {...{ navigateTo, handleSubmit, isSubmitting, formData, handleInputChange }} successPage={PAGES.ADMIN_SCREENING_DEPRESSION} pageTitle="ข้อมูลภาวะซึมเศร้า">
             <div className="form-group"><label className="required">ใน 2 สัปดาห์ที่ผ่านมา รวมวันนี้ ท่านรู้สึก หดหู่ เศร้า หรือท้อแท้สิ้นหวัง หรือไม่</label><select id="q1_sad" value={formData.q1_sad} onChange={handleInputChange}><option>ไม่มี</option><option>มี</option></select></div>
             <div className="form-group"><label className="required">ใน 2 สัปดาห์ที่ผ่านมา รวมวันนี้ ท่านรู้สึก เบื่อ ทำอะไรก็ไม่เพลิดเพลิน หรือไม่</label><select id="q2_bored" value={formData.q2_bored} onChange={handleInputChange}><option>ไม่มี</option><option>มี</option></select></div>
        </ScreeningFormLayout>
    );
};


// --- All Screening Management Pages ---

const AdminScreeningBmiPage = (props) => (
    <GenericAdminPage
        {...props}
        tableName="screening_bmi"
        addPage={PAGES.ADMIN_ADD_SCREENING_BMI}
        columns={['#', 'วันที่คัดกรอง', 'ชื่อ-สกุล', 'น้ำหนัก', 'ส่วนสูง', 'ฺBMI', 'การแปลผล', 'สถานี', 'ดำเนินการ']}
        renderRow={(item, index, handleDelete) => (
             <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{new Date(item.screening_date).toLocaleDateString('th-TH')}</td>
                <td>{item.title}{item.full_name}</td>
                <td>{item.weight}</td>
                <td>{item.height}</td>
                <td>{item.bmi}</td>
                <td><span className={`status status-normal`}>{item.interpretation}</span></td>
                <td>{item.station}</td>
                <td className="table-actions">
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}><i className="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        )}
    />
);

const AdminScreeningWaistPage = (props) => (
     <GenericAdminPage
        {...props}
        tableName="screening_waist"
        addPage={PAGES.ADMIN_ADD_SCREENING_WAIST}
        columns={['#', 'วันที่คัดกรอง', 'ชื่อ-สกุล', 'รอบเอว (cm)', 'ส่วนสูง (cm)', 'การแปลผล', 'สถานี', 'ดำเนินการ']}
        renderRow={(item, index, handleDelete) => (
             <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{new Date(item.screening_date).toLocaleDateString('th-TH')}</td>
                <td>{item.title}{item.full_name}</td>
                <td>{item.waist}</td>
                <td>{item.height}</td>
                <td><span className={`status ${item.interpretation === 'เกินเกณฑ์' ? 'status-over' : 'status-normal'}`}>{item.interpretation}</span></td>
                <td>{item.station}</td>
                <td className="table-actions">
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}><i className="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        )}
    />
);

const AdminScreeningBpPage = (props) => (
     <GenericAdminPage
        {...props}
        tableName="screening_bp"
        addPage={PAGES.ADMIN_ADD_SCREENING_BP}
        columns={['#', 'วันที่คัดกรอง', 'ชื่อ-สกุล', 'ค่าบน', 'ค่าล่าง', 'การแปลผล', 'สถานี', 'ดำเนินการ']}
        renderRow={(item, index, handleDelete) => (
             <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{new Date(item.screening_date).toLocaleDateString('th-TH')}</td>
                <td>{item.title}{item.full_name}</td>
                <td>{item.systolic}</td>
                <td>{item.diastolic}</td>
                <td><span className={`status ${item.interpretation !== 'ปกติ' ? 'status-risk' : 'status-normal'}`}>{item.interpretation}</span></td>
                <td>{item.station}</td>
                <td className="table-actions">
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}><i className="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        )}
    />
);

const AdminScreeningSugarPage = (props) => (
     <GenericAdminPage
        {...props}
        tableName="screening_sugar"
        addPage={PAGES.ADMIN_ADD_SCREENING_SUGAR}
        columns={['#', 'วันที่คัดกรอง', 'ชื่อ-สกุล', 'ระดับน้ำตาล', 'อดอาหาร', 'การแปลผล', 'สถานี', 'ดำเนินการ']}
        renderRow={(item, index, handleDelete) => (
             <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{new Date(item.screening_date).toLocaleDateString('th-TH')}</td>
                <td>{item.title}{item.full_name}</td>
                <td>{item.sugar_level}</td>
                <td>{item.fasting}</td>
                <td><span className={`status ${item.interpretation !== 'ปกติ' ? 'status-risk' : 'status-normal'}`}>{item.interpretation}</span></td>
                <td>{item.station}</td>
                <td className="table-actions">
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}><i className="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        )}
    />
);

const AdminScreeningSmokingPage = (props) => (
     <GenericAdminPage
        {...props}
        tableName="screening_smoking"
        addPage={PAGES.ADMIN_ADD_SCREENING_SMOKING}
        columns={['#', 'วันที่คัดกรอง', 'ชื่อ-สกุล', 'การสูบบุหรี่', 'การแปลผล', 'สถานี', 'ดำเนินการ']}
        renderRow={(item, index, handleDelete) => (
             <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{new Date(item.screening_date).toLocaleDateString('th-TH')}</td>
                <td>{item.title}{item.full_name}</td>
                <td>{item.smoking_status}</td>
                <td><span className={`status ${item.interpretation !== 'ไม่มีความเสี่ยง' ? 'status-risk' : 'status-normal'}`}>{item.interpretation}</span></td>
                <td>{item.station}</td>
                <td className="table-actions">
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}><i className="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        )}
    />
);

const AdminScreeningAlcoholPage = (props) => (
     <GenericAdminPage
        {...props}
        tableName="screening_alcohol"
        addPage={PAGES.ADMIN_ADD_SCREENING_ALCOHOL}
        columns={['#', 'วันที่คัดกรอง', 'ชื่อ-สกุล', 'การดื่มแอลกอฮอล์', 'การแปลผล', 'สถานี', 'ดำเนินการ']}
        renderRow={(item, index, handleDelete) => (
             <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{new Date(item.screening_date).toLocaleDateString('th-TH')}</td>
                <td>{item.title}{item.full_name}</td>
                <td>{item.alcohol_status}</td>
                <td><span className={`status ${item.interpretation !== 'ไม่มีความเสี่ยง' ? 'status-risk' : 'status-normal'}`}>{item.interpretation}</span></td>
                <td>{item.station}</td>
                <td className="table-actions">
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}><i className="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        )}
    />
);

const AdminScreeningDepressionPage = (props) => (
     <GenericAdminPage
        {...props}
        tableName="screening_depression"
        addPage={PAGES.ADMIN_ADD_SCREENING_DEPRESSION}
        columns={['#', 'วันที่คัดกรอง', 'ชื่อ-สกุล', 'คำถาม 1', 'คำถาม 2', 'การแปลผล', 'สถานี', 'ดำเนินการ']}
        renderRow={(item, index, handleDelete) => (
             <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{new Date(item.screening_date).toLocaleDateString('th-TH')}</td>
                <td>{item.title}{item.full_name}</td>
                <td>{item.q1_sad}</td>
                <td>{item.q2_bored}</td>
                <td><span className={`status ${item.interpretation !== 'ไม่มีความเสี่ยง' ? 'status-risk' : 'status-normal'}`}>{item.interpretation}</span></td>
                <td>{item.station}</td>
                <td className="table-actions">
                    <button className="btn btn-danger" onClick={() => handleDelete(item.id)}><i className="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        )}
    />
);


const AdminReportsPage = () => (
    <div className="page-container">
        <PageHeader title="รายงาน" subtitle="เลือกประเภทรายงานที่ต้องการ"/>
        <div className="home-grid">
            <div className="home-card color-1">
                 <div className="icon"><i className="fa-solid fa-file-invoice"></i></div>
                <h3>รายงานสรุป</h3>
                <p>ดูรายงานสรุปผลการดำเนินงานในรูปแบบต่างๆ</p>
            </div>
             <div className="home-card color-2">
                 <div className="icon"><i className="fa-solid fa-file-export"></i></div>
                <h3>ส่งออกทะเบียน</h3>
                <p>ส่งออกข้อมูลทะเบียนการคัดกรองเป็นไฟล์ Excel</p>
            </div>
        </div>
    </div>
);


// Admin layout component
const AdminLayout = ({ children, title, navigateTo }) => (
    <div className="admin-layout">
        <header className="admin-header">
            <div>
                 <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(PAGES.ADMIN_DASHBOARD); }} style={{fontSize: '0.9rem', color: 'var(--text-light-color)'}}>
                    <i className="fa-solid fa-arrow-left"></i> กลับหน้าหลัก
                </a>
                <h1>{title}</h1>
            </div>
        </header>
        <main className="admin-main">
            {children}
        </main>
    </div>
);


// --- Main App Component ---
const App = () => {
    const [currentPage, setCurrentPage] = useState(PAGES.HOME);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const navigateTo = (page) => {
        window.scrollTo(0, 0);
        setCurrentPage(page);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
        navigateTo(PAGES.ADMIN_DASHBOARD);
    };
    
    const handleLogout = () => {
        setIsLoggedIn(false);
        navigateTo(PAGES.HOME);
    };
    
    const renderPage = () => {
        if (!isLoggedIn) {
            switch (currentPage) {
                case PAGES.HOME: return <HomePage navigateTo={navigateTo} />;
                case PAGES.CARB_COUNTER: return <CarbCounterPage navigateTo={navigateTo} />;
                case PAGES.KNOWLEDGE_ASSESSMENT: return <KnowledgeAssessmentPage navigateTo={navigateTo} />;
                case PAGES.IS_IT_TRUE_DOCTOR: return <IsItTrueDoctorPage navigateTo={navigateTo} />;
                case PAGES.INNOVATION_ASSESSMENT: return <InnovationAssessmentPage navigateTo={navigateTo} />;
                case PAGES.KNOWLEDGE_BASE: return <KnowledgeBasePage navigateTo={navigateTo} />;
                case PAGES.LOGIN: return <LoginPage navigateTo={navigateTo} handleLogin={handleLogin}/>;
                case PAGES.REGISTER: return <RegisterPage navigateTo={navigateTo} />;
                default: return <HomePage navigateTo={navigateTo} />;
            }
        } else {
             // Logged in user routing
            const AdminPage = (title, Component, props = {}) => (
                <AdminLayout title={title} navigateTo={navigateTo}>
                    <Component navigateTo={navigateTo} {...props} />
                </AdminLayout>
            );

            switch (currentPage) {
                case PAGES.ADMIN_DASHBOARD: return AdminPage("เมนูจัดการ", AdminDashboard);
                case PAGES.ADMIN_USER_MANAGEMENT: return AdminPage("การจัดการผู้ใช้", AdminUserManagement);
                case PAGES.ADMIN_ADD_USER: return AdminPage("เพิ่มผู้ใช้ใหม่", AdminAddUserPage);
                case PAGES.ADMIN_HEALTH_STATION_MANAGEMENT: return AdminPage("การจัดการ Health Station", AdminHealthStationManagement);
                case PAGES.ADMIN_ADD_HEALTH_STATION: return AdminPage("เพิ่ม Health Station", AdminAddHealthStationPage);
                
                case PAGES.ADMIN_SCREENING_DASHBOARD: return AdminPage("ทะเบียนการคัดกรอง", AdminScreeningDashboard);
                case PAGES.ADMIN_SCREENING_BMI: return AdminPage("การคัดกรอง: ดัชนีมวลกาย", AdminScreeningBmiPage);
                case PAGES.ADMIN_ADD_SCREENING_BMI: return AdminPage("เพิ่มข้อมูล: ดัชนีมวลกาย", AdminAddScreeningBmiPage);
                case PAGES.ADMIN_SCREENING_WAIST: return AdminPage("การคัดกรอง: รอบเอว", AdminScreeningWaistPage);
                case PAGES.ADMIN_ADD_SCREENING_WAIST: return AdminPage("เพิ่มข้อมูล: รอบเอว", AdminAddScreeningWaistPage);
                case PAGES.ADMIN_SCREENING_BP: return AdminPage("การคัดกรอง: ความดันโลหิต", AdminScreeningBpPage);
                case PAGES.ADMIN_ADD_SCREENING_BP: return AdminPage("เพิ่มข้อมูล: ความดันโลหิต", AdminAddScreeningBpPage);
                case PAGES.ADMIN_SCREENING_SUGAR: return AdminPage("การคัดกรอง: น้ำตาลในเลือด", AdminScreeningSugarPage);
                case PAGES.ADMIN_ADD_SCREENING_SUGAR: return AdminPage("เพิ่มข้อมูล: น้ำตาลในเลือด", AdminAddScreeningSugarPage);
                case PAGES.ADMIN_SCREENING_SMOKING: return AdminPage("การคัดกรอง: การสูบบุหรี่", AdminScreeningSmokingPage);
                case PAGES.ADMIN_ADD_SCREENING_SMOKING: return AdminPage("เพิ่มข้อมูล: การสูบบุหรี่", AdminAddScreeningSmokingPage);
                case PAGES.ADMIN_SCREENING_ALCOHOL: return AdminPage("การคัดกรอง: การดื่มสุรา", AdminScreeningAlcoholPage);
                case PAGES.ADMIN_ADD_SCREENING_ALCOHOL: return AdminPage("เพิ่มข้อมูล: การดื่มสุรา", AdminAddScreeningAlcoholPage);
                case PAGES.ADMIN_SCREENING_DEPRESSION: return AdminPage("การคัดกรอง: ภาวะซึมเศร้า", AdminScreeningDepressionPage);
                case PAGES.ADMIN_ADD_SCREENING_DEPRESSION: return AdminPage("เพิ่มข้อมูล: ภาวะซึมเศร้า", AdminAddScreeningDepressionPage);
                
                case PAGES.ADMIN_KNOWLEDGE_ASSESSMENT_RESULTS: return AdminPage("ผลการประเมินความรอบรู้", AdminKnowledgeAssessmentResults);
                case PAGES.ADMIN_INNOVATION_ASSESSMENT_RESULTS: return AdminPage("ผลการประเมินนวัตกรรม", AdminInnovationAssessmentResults);
                
                // FIX: Corrected typo from ADMIN_REports to ADMIN_REPORTS.
                case PAGES.ADMIN_REPORTS: return AdminPage("รายงาน", AdminReportsPage);

                default: return AdminPage("เมนูจัดการ", AdminDashboard);
            }
        }
    };

    return (
        <>
            <AppHeader navigateTo={navigateTo} isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
            <main>
                {renderPage()}
            </main>
            <AppFooter />
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);