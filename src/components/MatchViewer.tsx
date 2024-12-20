import React from 'react';

interface MatchViewerProps {
    regex: string;
    text: string;
}

const MatchViewer: React.FC<MatchViewerProps> = ({ regex, text }) => {
    let matches: RegExpExecArray[] = [];
    try {
        const regExp = new RegExp(regex, 'g');
        matches = Array.from(text.matchAll(regExp)) as RegExpExecArray[];
    } catch {
        return <p style={{ color: 'red' }}>Invalid Regular Expression</p>;
    }

    const colors = ['#f28b82', '#fbbc04', '#34a853', '#4285f4', '#9c27b0'];

    return (
        <div>
            {matches.map((match, index) => (
                <div key={index}>
                    <span style={{ fontWeight: 'bold' }}>Match {index + 1}:</span>
                    {match.map((group: string | undefined, groupIndex: number) => (
                        <span
                            key={groupIndex}
                            style={{
                                backgroundColor: colors[groupIndex % colors.length],
                                padding: '2px 4px',
                                margin: '0 2px',
                                borderRadius: '3px',
                            }}
                        >
              {group}
            </span>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default MatchViewer;
