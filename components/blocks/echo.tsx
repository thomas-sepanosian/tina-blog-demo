'use client';
import * as React from 'react';
import type { Template } from 'tinacms';
import { tinaField } from 'tinacms/dist/react';
import { PageBlocksEcho } from '@/tina/__generated__/types';
import { Section, sectionBlockSchemaField } from '../layout/section';
import { EchoTextInput, EchoCountInput, EchoMoodPicker, ECHO_MOODS, type EchoMoodKey } from '@/tina/fields/echo';

// Helper to interpolate between colors in a gradient
const getColorAtPosition = (colors: readonly string[], position: number): string => {
    if (colors.length === 1) return colors[0];

    const scaledPosition = position * (colors.length - 1);
    const lowerIndex = Math.floor(scaledPosition);
    const upperIndex = Math.min(lowerIndex + 1, colors.length - 1);
    const localPosition = scaledPosition - lowerIndex;

    const lowerColor = colors[lowerIndex];
    const upperColor = colors[upperIndex];

    // Parse hex colors
    const lower = {
        r: parseInt(lowerColor.slice(1, 3), 16),
        g: parseInt(lowerColor.slice(3, 5), 16),
        b: parseInt(lowerColor.slice(5, 7), 16),
    };
    const upper = {
        r: parseInt(upperColor.slice(1, 3), 16),
        g: parseInt(upperColor.slice(3, 5), 16),
        b: parseInt(upperColor.slice(5, 7), 16),
    };

    // Interpolate
    const r = Math.round(lower.r + (upper.r - lower.r) * localPosition);
    const g = Math.round(lower.g + (upper.g - lower.g) * localPosition);
    const b = Math.round(lower.b + (upper.b - lower.b) * localPosition);

    return `rgb(${r}, ${g}, ${b})`;
};

export const EchoBlock = ({ data }: { data: PageBlocksEcho }) => {
    const echoText = data.text || 'Echo';
    const repeatCount = Math.max(1, data.count || 3);
    const mood = (data.mood as EchoMoodKey) || 'fire';
    const moodConfig = ECHO_MOODS[mood] || ECHO_MOODS.fire;

    // Animation state - offset for color cycling
    const [colorOffset, setColorOffset] = React.useState(0);

    // Animate the color offset to create a cycling effect
    React.useEffect(() => {
        if (mood === 'none') return;

        const animationSpeed = 50; // ms between updates
        const interval = setInterval(() => {
            setColorOffset((prev) => (prev + 0.02) % 1);
        }, animationSpeed);

        return () => clearInterval(interval);
    }, [mood]);

    // Configuration: never shrink below 20% of original
    const MIN_THRESHOLD = 0.2;
    const STARTING_FONT_SIZE = 4; // rem
    const ENDING_FONT_SIZE = STARTING_FONT_SIZE * MIN_THRESHOLD; // 0.8rem

    // Calculate how much to reduce each property per iteration
    const stepsCount = Math.max(1, repeatCount - 1);
    const fontSizeDecrement = (STARTING_FONT_SIZE - ENDING_FONT_SIZE) / stepsCount;
    const opacityDecrement = (1 - MIN_THRESHOLD) / stepsCount;
    const scaleDecrement = (1 - MIN_THRESHOLD) / stepsCount;

    // Generate array of echoing text elements
    const echoElements = Array.from({ length: repeatCount }, (_, index) => {
        const currentFontSize = Math.max(ENDING_FONT_SIZE, STARTING_FONT_SIZE - (index * fontSizeDecrement));
        const currentOpacity = Math.max(MIN_THRESHOLD, 1 - (index * opacityDecrement));
        const currentScale = Math.max(MIN_THRESHOLD, 1 - (index * scaleDecrement));

        // Get color based on position in the echo sequence + animated offset
        const basePosition = stepsCount > 0 ? index / stepsCount : 0;
        // Add offset and wrap around using modulo to create cycling effect
        const animatedPosition = (basePosition + colorOffset) % 1;
        const textColor = mood === 'none' ? undefined : getColorAtPosition(moodConfig.colors, animatedPosition);
        const textShadow = mood === 'none' ? undefined : `0 0 ${20 - index * 2}px ${textColor}40`;

        return (
            <div
                key={index}
                className="text-center font-bold transition-colors duration-100"
                style={{
                    fontSize: `${currentFontSize}rem`,
                    opacity: currentOpacity,
                    transform: `scale(${currentScale})`,
                    color: textColor,
                    textShadow,
                }}
                data-tina-field={tinaField(data, `text`)}
            >
                {echoText}
            </div>
        );
    });

    return (
        <Section background={data.background!}>
            <div className="flex flex-col items-center gap-2 py-12" data-tina-field={tinaField(data, 'text')}>
                {echoElements}
            </div>
        </Section>
    );
};

export const echoBlockSchema: Template = {
    name: 'echo',
    label: 'Echo',
    ui: {
        previewSrc: '/blocks/echo.png',
        defaultItem: {
            text: 'Echo',
            count: 5,
            mood: 'fire',
        },
    },
    fields: [
        sectionBlockSchemaField as any,
        {
            type: 'string',
            label: 'Text',
            name: 'text',
            description: 'The text to repeat',
            ui: {
                component: EchoTextInput,
            },
        },
        {
            type: 'number',
            label: 'Repeat Count',
            name: 'count',
            description: 'How many times to repeat the text',
            ui: {
                component: EchoCountInput,
            },
        },
        {
            type: 'string',
            label: 'Mood',
            name: 'mood',
            description: 'Choose a color mood for the echo effect',
            ui: {
                component: EchoMoodPicker,
            },
        },
    ],
};

