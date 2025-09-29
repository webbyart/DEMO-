
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { createClient } from '@supabase/supabase-js';

// --- Supabase Client Setup ---
// ได้ทำการตั้งค่า Supabase URL และ Key ตามที่ผู้ใช้ให้มาเรียบร้อยแล้ว
const supabaseUrl = 'https://fvczvzmgyxcjamibrubit.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ2Y3p2em1neGNqYW1pYnJ1cGl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxMjE2MDUsImV4cCI6MjA3NDY5NzYwNX0.tk7AQrusK8mco8MsF0Fuo-BE3gH7gWSfzFBmlnxHKEk';

// FIX: Removed an obsolete check for placeholder Supabase credentials.
// Since the credentials are hardcoded as constants, TypeScript infers their literal types,
// causing an error when comparing them to different string literals. This check is no longer needed.
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
    ADMIN_HEALTH_STATION_MANAGEMENT: 'admin_health_station_management',
    
    ADMIN_SCREENING_BMI: 'admin_screening_bmi',
    ADMIN_SCREENING_WAIST: 'admin_screening_waist',
    ADMIN_SCREENING_BP: 'admin_screening_bp',
    ADMIN_SCREENING_SUGAR: 'admin_screening_sugar',
    ADMIN_SCREENING_SMOKING: 'admin_screening_smoking',
    ADMIN_SCREENING_ALCOHOL: 'admin_screening_alcohol',
    ADMIN_SCREENING_DEPRESSION: 'admin_screening_depression',
    
    ADMIN_KNOWLEDGE_REGISTRY: 'admin_knowledge_registry',
    ADMIN_EVALUATION_RESULTS: 'admin_evaluation_results',
    ADMIN_REPORTS: 'admin_reports',
};

// --- MOCK DATA (จะถูกแทนที่ด้วยข้อมูลจาก Supabase) ---
const healthUnits = [
    { id: 1, name: 'รพ.สต.บ้านแก่งกระทั่ง', lineId: '@healthstation1' },
    { id: 2, name: 'รพ.สต.ปากทรง', lineId: '@healthstation2' },
    { id: 3, name: 'รพ.สต.ขันเงิน', lineId: '@healthstation3' },
    { id: 4, name: 'รพ.สต.บ้านท่าแซะ', lineId: '@healthstation4' },
    { id: 5, name: 'รพ.สต.บางมะพร้าว', lineId: '@healthstation5' },
];

// --- Reusable Components ---
const AppHeader = ({ navigateTo, isLoggedIn, handleLogout }) => (
    <header className="app-header">
        <div className="header-content">
            <div className="logo-container" onClick={() => navigateTo(PAGES.HOME)} style={{ cursor: 'pointer' }}>
                <img src="https://i.imgur.com/8f1CRaE.png" alt="Health Station Logo" />
                <h1>Health Station <span>ท่าแซะ</span></h1>
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
        <p>สงวนลิขสิทธิ์ © 2025 สำนักงานสาธารณสุขอำเภอท่าแซะ | พัฒนาระบบโดย Health Station @ ท่าแซะ </p>
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
        house_no: '', moo: '', province: '', district: '', sub_district: '',
        age: '', gender: '', height: '', weight: '', activity: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { id, value, name } = e.target;
        if (name === 'gender') {
            setFormData({ ...formData, gender: value });
        } else {
            setFormData({ ...formData, [id]: value });
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const { data, error } = await supabase
            .from('carb_counting_data') // ตรวจสอบให้แน่ใจว่าชื่อตารางถูกต้อง
            .insert([formData]);

        if (error) {
            console.error('Error inserting data:', error);
            alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล: ' + error.message);
        } else {
            alert('บันทึกข้อมูลสำเร็จ!');
            setFormData({ // Reset form
                id_card: '', title: '', first_name: '', last_name: '',
                house_no: '', moo: '', province: '', district: '', sub_district: '',
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
                        <div className="form-group"><label className="required" htmlFor="province">จังหวัด</label><select id="province" value={formData.province} onChange={handleInputChange}><option>-- เลือกจังหวัด --</option></select></div>
                        <div className="form-group"><label className="required" htmlFor="district">อำเภอ</label><select id="district" value={formData.district} onChange={handleInputChange}><option>-- เลือกอำเภอ --</option></select></div>
                        <div className="form-group"><label className="required" htmlFor="sub_district">ตำบล</label><select id="sub_district" value={formData.sub_district} onChange={handleInputChange}><option>-- เลือกตำบล --</option></select></div>
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

const KnowledgeAssessmentPage = ({ navigateTo }) => (
    <div className="container">
        <div className="page-container">
            <PageHeader title="แบบประเมินความรอบรู้ด้านสุขภาพและพฤติกรรมสุขภาพ" subtitle="สำหรับประชาชนวัยทำงาน ในหมู่บ้านปรับเปลี่ยนพฤติกรรมสุขภาพ" />
             <form onSubmit={e => e.preventDefault()}>
                <div className="form-grid" style={{alignItems: 'flex-end'}}>
                    <div className="form-group">
                        <label>วันที่ประเมิน</label>
                        <input type="date" defaultValue="2025-09-24"/>
                    </div>
                     <div className="form-group">
                        <label className="required">ชื่อ - สกุล</label>
                        <input type="text" placeholder="กรอกชื่อ-สกุล" />
                    </div>
                </div>
                <div className="form-grid">
                     <div className="form-group">
                        <label className="required">บ้านเลขที่</label>
                        <input type="text" />
                    </div>
                     <div className="form-group">
                        <label>หมู่</label>
                        <input type="text" />
                    </div>
                     <div className="form-group">
                        <label>ตำบล</label>
                        <input type="text" />
                    </div>
                    <div className="form-group">
                        <label>อำเภอ</label>
                        <input type="text" />
                    </div>
                    <div className="form-group">
                        <label>จังหวัด</label>
                        <input type="text" />
                    </div>
                </div>
                
                <h2 className="form-section-header">คำถามประเมิน</h2>
                <div className="form-group">
                    <label>ด้านที่ 1: ความรู้พื้นฐานด้านสุขภาพ</label>
                    <div className="radio-group">
                        <label><input type="radio" name="q1" /> ดีมาก</label>
                        <label><input type="radio" name="q1" /> ดี</label>
                        <label><input type="radio" name="q1" /> ปานกลาง</label>
                    </div>
                </div>
                 <div className="form-group">
                    <label>ด้านที่ 2: การเข้าถึงข้อมูลสุขภาพ</label>
                    <div className="radio-group">
                        <label><input type="radio" name="q2" /> ดีมาก</label>
                        <label><input type="radio" name="q2" /> ดี</label>
                        <label><input type="radio" name="q2" /> ปานกลาง</label>
                    </div>
                </div>
                {/* Add more questions as needed */}
                 <div className="form-actions">
                    <button type="button" className="btn btn-outline" onClick={() => navigateTo(PAGES.HOME)}>ยกเลิก</button>
                    <button type="submit" className="btn btn-primary">ส่งแบบประเมิน</button>
                </div>
            </form>
        </div>
    </div>
);

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

const InnovationAssessmentPage = ({ navigateTo }) => (
     <div className="container">
        <div className="page-container">
             <div style={{textAlign: 'center', marginBottom: '2rem', backgroundColor: '#fffbe6', padding: '1rem', borderRadius: 'var(--border-radius)'}}>
                <h1 style={{color: '#f59e0b'}}><i className="fa-solid fa-star"></i> ประเมินความพึงพอใจ</h1>
                <p>ท่านมีความพึงพอใจต่อการใช้ นวัตกรรม Health Station @ ท่าแซะ อยู่ในระดับใด ?</p>
            </div>
            <form onSubmit={e => e.preventDefault()}>
                 <div className="form-group">
                    <label className="required">ท่านมีความพึงพอใจต่อการใช้ นวัตกรรม Health Station @ ท่าแซะ อยู่ในระดับใด ?</label>
                    <div className="radio-group">
                        <label><input type="radio" name="satisfaction" /> พอใจมากที่สุด</label>
                        <label><input type="radio" name="satisfaction" /> พอใจมาก</label>
                        <label><input type="radio" name="satisfaction" /> พอใจปานกลาง</label>
                        <label><input type="radio" name="satisfaction" /> พอใจน้อย</label>
                        <label><input type="radio" name="satisfaction" /> พอใจน้อยที่สุด</label>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="suggestions">ข้อเสนอแนะ</label>
                    <textarea id="suggestions" name="suggestions" rows={4} placeholder="ข้อเสนอแนะเพิ่มเติมเพื่อการพัฒนาที่ดีขึ้น (ไม่บังคับ)"></textarea>
                </div>
                <div className="form-grid">
                    <div className="form-group">
                        <label>วันที่ประเมิน</label>
                        <input type="date" defaultValue="2025-09-24"/>
                    </div>
                    <div className="form-group">
                        <label>ลงชื่อผู้ประเมิน (ไม่บังคับ)</label>
                        <input type="text" id="eval-name" name="eval-name" />
                    </div>
                </div>
                <div className="form-actions">
                    <button type="button" className="btn btn-outline" onClick={() => navigateTo(PAGES.HOME)}>ยกเลิก</button>
                    <button type="submit" className="btn btn-primary">ส่งแบบประเมิน</button>
                </div>
            </form>
        </div>
    </div>
);

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

const RegisterPage = ({ navigateTo }) => (
     <div className="container" style={{maxWidth: '500px'}}>
        <div className="page-container">
            <PageHeader title="ลงทะเบียน" subtitle="สร้างบัญชีผู้ใช้ใหม่สำหรับเจ้าหน้าที่" />
            <form onSubmit={(e) => { e.preventDefault(); alert('ลงทะเบียนสำเร็จ!'); navigateTo(PAGES.LOGIN); }}>
                <div className="form-group">
                    <label className="required" htmlFor="fullname">ชื่อ-สกุล</label>
                    <input type="text" id="fullname" required />
                </div>
                <div className="form-group">
                    <label className="required" htmlFor="reg-username">ชื่อผู้ใช้</label>
                    <input type="text" id="reg-username" required />
                </div>
                <div className="form-group">
                    <label className="required" htmlFor="reg-password">รหัสผ่าน</label>
                    <input type="password" id="reg-password" required />
                </div>
                 <div className="form-group">
                    <label className="required" htmlFor="confirm-password">ยืนยันรหัสผ่าน</label>
                    <input type="password" id="confirm-password" required />
                </div>
                <div className="form-actions">
                    <button type="button" className="btn btn-outline" onClick={() => navigateTo(PAGES.LOGIN)}>กลับไปหน้าเข้าสู่ระบบ</button>
                    <button type="submit" className="btn btn-primary">ลงทะเบียน</button>
                </div>
            </form>
        </div>
    </div>
);


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
                    <a href="#" onClick={(e) => { e.preventDefault(); navigateTo(PAGES.ADMIN_SCREENING_BMI); }}>จัดการ →</a>
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

const AdminScreeningLayout = ({ navigateTo, activeTab, children, onTabClick }) => (
    <>
        <div className="admin-tabs">
            <button onClick={() => onTabClick(PAGES.ADMIN_SCREENING_BMI)} className={activeTab === PAGES.ADMIN_SCREENING_BMI ? 'active' : ''}>ดัชนีมวลกาย</button>
            <button onClick={() => onTabClick(PAGES.ADMIN_SCREENING_WAIST)} className={activeTab === PAGES.ADMIN_SCREENING_WAIST ? 'active' : ''}>รอบเอว</button>
            <button onClick={() => onTabClick(PAGES.ADMIN_SCREENING_BP)} className={activeTab === PAGES.ADMIN_SCREENING_BP ? 'active' : ''}>ความดันโลหิต</button>
            <button onClick={() => onTabClick(PAGES.ADMIN_SCREENING_SUGAR)} className={activeTab === PAGES.ADMIN_SCREENING_SUGAR ? 'active' : ''}>น้ำตาลในเลือด</button>
            <button onClick={() => onTabClick(PAGES.ADMIN_SCREENING_SMOKING)} className={activeTab === PAGES.ADMIN_SCREENING_SMOKING ? 'active' : ''}>การสูบบุหรี่</button>
            <button onClick={() => onTabClick(PAGES.ADMIN_SCREENING_ALCOHOL)} className={activeTab === PAGES.ADMIN_SCREENING_ALCOHOL ? 'active' : ''}>การดื่มสุรา</button>
            <button onClick={() => onTabClick(PAGES.ADMIN_SCREENING_DEPRESSION)} className={activeTab === PAGES.ADMIN_SCREENING_DEPRESSION ? 'active' : ''}>ภาวะซึมเศร้า</button>
        </div>
        <div className="table-toolbar">
            <div className="search-filter">
                <input type="text" placeholder="ค้นหา..."/>
                <button className="btn"><i className="fa-solid fa-filter"></i> กรอง</button>
            </div>
            <button className="btn btn-primary"><i className="fa-solid fa-plus"></i> เพิ่มใหม่</button>
        </div>
        {children}
        <div className="pagination">
            <button className="btn btn-outline">&lt; ก่อนหน้า</button>
            <button className="btn btn-primary">1</button>
            <button className="btn btn-outline">2</button>
            <button className="btn btn-outline">ถัดไป &gt;</button>
        </div>
    </>
);

const AdminScreeningBmi = () => (
    <div className="table-responsive">
        <table className="data-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>วันที่คัดกรอง</th>
                    <th>ชื่อ-สกุล</th>
                    <th>เลขประจำตัวประชาชน</th>
                    <th>น้ำหนัก</th>
                    <th>ส่วนสูง</th>
                    <th>BMI</th>
                    <th>การแปลผล</th>
                    <th>สถานี</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td><td>2568-09-22</td><td>นางนูรียะห์ สะนี</td><td>1900300012381</td><td>53</td><td>154</td><td>22.35</td><td><span className="status status-normal">ร่างกายสมส่วน</span></td><td>@สมานมิตร</td>
                    <td className="table-actions"><button><i className="fa-solid fa-trash"></i></button></td>
                </tr>
                 <tr>
                    <td>2</td><td>2568-09-22</td><td>นางสาวพัชรกร เกตุนวล</td><td>3860200467775</td><td>50</td><td>152</td><td>21.64</td><td><span className="status status-normal">ร่างกายสมส่วน</span></td><td>@สมานมิตร</td>
                    <td className="table-actions"><button><i className="fa-solid fa-trash"></i></button></td>
                </tr>
                <tr>
                    <td>3</td><td>2535-09-11</td><td>นางสาวจันทิมา สิงหนาท</td><td>1860200083334</td><td>73</td><td>152</td><td>31.6</td><td><span className="status status-risk">อ้วนอันตราย</span></td><td>@สมานมิตร</td>
                    <td className="table-actions"><button><i className="fa-solid fa-trash"></i></button></td>
                </tr>
            </tbody>
        </table>
    </div>
);

const AdminScreeningWaist = () => (
    <div className="table-responsive">
        <table className="data-table">
             <thead>
                <tr><th>#</th><th>วันที่คัดกรอง</th><th>ชื่อ-สกุล</th><th>รอบเอว</th><th>การแปลผล</th><th>สถานี</th><th></th></tr>
            </thead>
             <tbody>
                <tr><td>1</td><td>2568-09-22</td><td>นางนูรียะห์ สะนี</td><td>75</td><td><span className="status status-normal">ไม่เกินเกณฑ์</span></td><td>@สมานมิตร</td><td className="table-actions"><button><i className="fa-solid fa-trash"></i></button></td></tr>
                <tr><td>2</td><td>2568-09-22</td><td>นางสาวพัชรกร เกตุนวล</td><td>78</td><td><span className="status status-over">เกินเกณฑ์</span></td><td>@สมานมิตร</td><td className="table-actions"><button><i className="fa-solid fa-trash"></i></button></td></tr>
            </tbody>
        </table>
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
            <button className="btn btn-primary"><i className="fa-solid fa-plus"></i> เพิ่มใหม่</button>
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
    const [adminScreeningTab, setAdminScreeningTab] = useState(PAGES.ADMIN_SCREENING_BMI);
    
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

    const handleAdminScreeningTabClick = (tab) => {
        setAdminScreeningTab(tab);
        navigateTo(tab);
    }
    
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
            switch (currentPage) {
                case PAGES.ADMIN_DASHBOARD:
                    return (
                        <AdminLayout title="เมนูจัดการ" navigateTo={navigateTo}>
                            <AdminDashboard navigateTo={navigateTo} />
                        </AdminLayout>
                    );
                case PAGES.ADMIN_SCREENING_BMI:
                case PAGES.ADMIN_SCREENING_WAIST:
                case PAGES.ADMIN_SCREENING_BP:
                case PAGES.ADMIN_SCREENING_SUGAR:
                case PAGES.ADMIN_SCREENING_SMOKING:
                case PAGES.ADMIN_SCREENING_ALCOHOL:
                case PAGES.ADMIN_SCREENING_DEPRESSION:
                     return (
                        <AdminLayout title="ทะเบียนการคัดกรอง" navigateTo={navigateTo}>
                            <AdminScreeningLayout navigateTo={navigateTo} activeTab={adminScreeningTab} onTabClick={handleAdminScreeningTabClick}>
                                {adminScreeningTab === PAGES.ADMIN_SCREENING_BMI && <AdminScreeningBmi />}
                                {adminScreeningTab === PAGES.ADMIN_SCREENING_WAIST && <AdminScreeningWaist />}
                                {/* Add other screening components here */}
                            </AdminScreeningLayout>
                        </AdminLayout>
                    );
                default:
                    return <HomePage navigateTo={navigateTo} />;
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
