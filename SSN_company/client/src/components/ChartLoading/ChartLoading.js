import React from "react";
import './ChartLoading.scss'; // Импортируем стили

const ChartLoading = () => {
    return (
        <div className="chart-loading">
            <svg viewBox="0 0 120 100" className="chart-animation">
                <path className="chart-path" d="M10 80 L30 50 L50 70 L70 20 L90 60 L110 40" />
            </svg>
            <p className="text_mln_f26_l26">in future...</p>
        </div>
    );
}

export default ChartLoading;