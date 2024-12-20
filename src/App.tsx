import React, { useState } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';

const App: React.FC = () => {
    const [regex, setRegex] = useState('');
    const [text, setText] = useState('');

    // 匹配结果逻辑
    const getHighlightedText = (regex: string, text: string) => {
        if (!regex) return text;

        let regExp: RegExp;
        try {
            regExp = new RegExp(regex, 'g');
        } catch (error) {
            return (
                <Typography color="error" variant="body2">
                    Invalid Regular Expression
                </Typography>
            );
        }

        const colors = ['#f28b82', '#fbbc04', '#34a853', '#4285f4', '#9c27b0'];
        const matches = [...text.matchAll(regExp)];
        if (matches.length === 0) return text;

        let lastIndex = 0;
        const result: JSX.Element[] = [];

        matches.forEach((match, matchIndex) => {
            // 未匹配的部分
            if (match.index !== undefined && match.index > lastIndex) {
                result.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex, match.index)}</span>);
            }
            // 匹配的捕获组
            match.forEach((group, groupIndex) => {
                if (group) {
                    result.push(
                        <span
                            key={`group-${matchIndex}-${groupIndex}`}
                            style={{
                                backgroundColor: colors[groupIndex % colors.length],
                                padding: '0 2px',
                                borderRadius: '4px',
                                margin: '0 1px',
                            }}
                        >
              {group}
            </span>
                    );
                }
            });
            // 更新 lastIndex
            lastIndex = (match.index || 0) + match[0].length;
        });

        // 剩余的部分
        if (lastIndex < text.length) {
            result.push(<span key={`text-${lastIndex}`}>{text.slice(lastIndex)}</span>);
        }

        return result;
    };

    return (
        <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Regex Highlighter
                Regex Highlighter
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <TextField
                    label="Regular Expression"
                    variant="outlined"
                    value={regex}
                    onChange={(e) => setRegex(e.target.value)}
                    fullWidth
                />
                <TextField
                    label="Text to Match"
                    variant="outlined"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                />
                <Paper elevation={3} sx={{ p: 2, minHeight: 100 }}>
                    <Typography variant="body1" component="div">
                        {getHighlightedText(regex, text)}
                    </Typography>
                </Paper>
            </Box>
        </Box>
    );
};

export default App;
