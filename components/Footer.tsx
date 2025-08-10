import React from "react";


const Footer: React.FC = () => (
    <footer style={{ background: "black", color: "white", padding: "40px 0 20px 0", fontSize: "13px" }}>
            <div style={{ marginBottom: 20 }} className="flex justify-center items-center flex-col gap-3">
               <p className="text-white font-[4vw] text-3xl">Ready to watch? Enter your email to create or restart your Movie Journey</p>  
            </div>
    </footer>
);

export default Footer;