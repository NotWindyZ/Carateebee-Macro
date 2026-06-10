import React, { useMemo } from 'react';
import './BackgroundAnimation.css';

const Horseshoe = ({ color, style }: { color: string, style: React.CSSProperties }) => (
    <svg 
        viewBox="0 0 100 100" 
        style={{ fill: color, ...style }}
        xmlns="http://www.w3.org/2000/svg"
    >
        
        <path d="M 40 30 L 40 50 A 10 10 0 0 0 60 50 L 60 30 L 80 30 L 80 40 L 75 40 L 75 50 A 25 25 0 0 1 25 50 L 25 40 L 20 40 L 20 30 Z" />
    </svg>
);

export default function BackgroundAnimation() {

    const items = useMemo(() => {
        return Array.from({ length: 50 }).map((_, i) => {
            const size = 25 + Math.random() * 45; 
            const left = -20 + Math.random() * 120; 
            const top = -10 + Math.random() * 130; 
            
            const duration = 18 + Math.random() * 25; 
            const delay = -(Math.random() * 40); 
            
            const colors = [
                'rgba(167, 243, 208, 0.85)', 
                'rgba(186, 230, 253, 0.85)', 
                'rgba(253, 230, 138, 0.85)', 
                'rgba(233, 213, 255, 0.85)', 
            ];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            const rotDir = Math.random() > 0.5 ? 1 : -1;
            const rotDuration = 12 + Math.random() * 20; 
            
            return {
                id: i,
                size,
                left: `${left}%`,
                top: `${top}%`,
                duration: `${duration}s`,
                delay: `${delay}s`,
                color,
                rotDir,
                rotDuration: `${rotDuration}s`
            };
        });
    }, []);

    return (
        <div className="bg-animation-container">
            {items.map(item => (
                <div 
                    key={item.id}
                    className="horseshoe-wrapper"
                    style={{
                        left: item.left,
                        top: item.top,
                        width: `${item.size}px`,
                        height: `${item.size}px`,
                        animationDelay: item.delay,
                        animationDuration: item.duration,
                    }}
                >
                    <div 
                        className="horseshoe-rotater"
                        style={{
                            animationDelay: item.delay,
                            animationDuration: item.rotDuration,
                            animationDirection: item.rotDir > 0 ? 'normal' : 'reverse'
                        }}
                    >
                        <Horseshoe color={item.color} style={{ width: '100%', height: '100%' }} />
                    </div>
                </div>
            ))}
        </div>
    );
}
