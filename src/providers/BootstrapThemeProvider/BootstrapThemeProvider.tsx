import React, {PropsWithChildren} from 'react';
import {ThemeProvider} from "react-bootstrap";

export function BootstrapThemeProvider({children}:PropsWithChildren) {
    const prefixes: Record<string, string> = {
        "card-title": 'bot-card-title',
        "card-body": 'bot-card-body'
    }
    return (
        <ThemeProvider prefixes={prefixes}>
            {children}
        </ThemeProvider>
    );
}

