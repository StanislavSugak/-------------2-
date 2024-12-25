import {IconLinkedIn, IconTelegram, IconInstagram, IconGmail, IconVk} from '../../utils/icon'
import React from "react";
import "./Footer.scss";

const icons = [
    { src: IconLinkedIn, alt: "LinkedIn", link: "https://www.linkedin.com" },
    { src: IconTelegram, alt: "Telegram", link: "https://telegram.org" },
    { src: IconInstagram, alt: "Instagram", link: "https://instagram.com" },
    { src: IconGmail, alt: "Gmail", link: "mailto:example@gmail.com" },
    { src: IconVk, alt: "VK", link: "https://vk.com" },
];

const Footer = () => {
    return (
        <footer>
            <div className="footer_up">
                <div className="present">
                    <span className="present_text"> 
                    <span>
                        <span className="text_mnt_f32_l36_i">STAR</span><span className="text_mnt_f26_l36_i">map</span>
                    </span>
                    <span>
                        <span className="text_mnt_f32_l36_i">BUS</span><span className="text_mnt_f26_l36_i">factor</span>
                    </span>
                    </span>
                    
                    <button className="button_language" /*onClick={onClick}*/>
                        <p className="text_mln_f26_l26">English</p>
                    </button>
                </div>
                <div className="line"></div>
                <div className="info">
                    <div className="info_icon">
                        <div className="field">
                            <p className="text_mln_f32_l32">Creator</p>
                            <p className="text_mln_f26_l26">Sugak Stanislav Nikolaevich</p>
                        </div>
                        <div className="icon">
                            {icons.map((icon, index) => (
                                <a key={index} href={icon.link} target="_blank" rel="noopener noreferrer">
                                    <img src={icon.src} alt={icon.alt} />
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="info_who">
                        <div className="field">
                            <p className="text_mln_f32_l32">Contact</p>
                            <p className="text_mln_f26_l26">
                                +375 33 613-76-41
                            </p>
                        </div>
                        <div className="who">
                            <p className="text_mln_f26_l26">Especially for</p>
                            <p className="text_mnt_f32_l32">SSN</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer_down">
                <div className="mode">
                    <p className="text_mln_f26_l26">©</p>
                    <p className="text_mln_f20_l20">2024 SSN</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
