import React, { useState } from 'react';

interface RegexInputProps {
    onRegexChange: (regex: string) => void;
    onTextChange: (text: string) => void;
}

const RegexInput: React.FC<RegexInputProps> = ({ onRegexChange, onTextChange }) => {
    const [regex, setRegex] = useState('');
    const [testString, setTestString] = useState('');

    return (
        <div>
            <label>
                Regular Expression:
                <input
                    type="text"
                    value={regex}
                    onChange={(e) => {
                        setRegex(e.target.value);
                        onRegexChange(e.target.value);
                    }}
                />
            </label>
            <label>
                Test String:
                <textarea
                    value={testString}
                    onChange={(e) => {
                        setTestString(e.target.value);
                        onTextChange(e.target.value);
                    }}
                />
            </label>
        </div>
    );
};

export default RegexInput;
