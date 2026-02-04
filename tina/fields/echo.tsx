import React from 'react';
import { wrapFieldsWithMeta } from 'tinacms';

// Mood definitions with emoji and gradient colors
export const ECHO_MOODS = {
    none: {
        emoji: '🚫',
        label: 'None',
        gradient: 'none',
        colors: ['currentColor'],
    },
    fire: {
        emoji: '🔥',
        label: 'Fire',
        gradient: 'linear-gradient(135deg, #f97316 0%, #ef4444 50%, #dc2626 100%)',
        colors: ['#f97316', '#ef4444', '#dc2626'],
    },
    ocean: {
        emoji: '🌊',
        label: 'Ocean',
        gradient: 'linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #1e3a8a 100%)',
        colors: ['#06b6d4', '#3b82f6', '#1e3a8a'],
    },
    forest: {
        emoji: '🌲',
        label: 'Forest',
        gradient: 'linear-gradient(135deg, #84cc16 0%, #22c55e 50%, #059669 100%)',
        colors: ['#84cc16', '#22c55e', '#059669'],
    },
    blossom: {
        emoji: '🌸',
        label: 'Blossom',
        gradient: 'linear-gradient(135deg, #f9a8d4 0%, #f43f5e 50%, #db2777 100%)',
        colors: ['#f9a8d4', '#f43f5e', '#db2777'],
    },
    night: {
        emoji: '🌙',
        label: 'Night',
        gradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 50%, #312e81 100%)',
        colors: ['#a855f7', '#6366f1', '#312e81'],
    },
    rainbow: {
        emoji: '🌈',
        label: 'Rainbow',
        gradient: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 17%, #84cc16 33%, #22c55e 50%, #06b6d4 67%, #8b5cf6 83%, #ec4899 100%)',
        colors: ['#ef4444', '#f59e0b', '#84cc16', '#22c55e', '#06b6d4', '#8b5cf6', '#ec4899'],
    },
} as const;

export type EchoMoodKey = keyof typeof ECHO_MOODS;

// Custom mood picker field with emoji buttons
export const EchoMoodPicker = wrapFieldsWithMeta(({ input }) => {
    const selectedMood = (input.value as EchoMoodKey) || 'fire';

    return (
        <div className="flex flex-col gap-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm w-fit">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Mood Picker
            </span>
            <div className="grid grid-cols-3 gap-2">
                {Object.entries(ECHO_MOODS).map(([key, mood]) => {
                    const isSelected = selectedMood === key;
                    return (
                        <button
                            key={key}
                            type="button"
                            onClick={() => input.onChange(key)}
                            className={`
                                flex flex-col items-center gap-1 p-3 rounded-lg border-2 transition-all duration-200
                                ${isSelected
                                    ? 'border-blue-500 bg-blue-50 shadow-md scale-105'
                                    : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                                }
                            `}
                            style={{
                                boxShadow: isSelected ? `0 0 12px ${mood.colors[0]}40` : undefined,
                            }}
                        >
                            <span className="text-2xl" style={{ filter: isSelected ? 'none' : 'grayscale(50%)' }}>
                                {mood.emoji}
                            </span>
                            <span className="text-xs font-medium text-gray-600">{mood.label}</span>
                            {isSelected && (
                                <div
                                    className="w-full h-1 rounded-full mt-1"
                                    style={{ background: mood.gradient }}
                                />
                            )}
                        </button>
                    );
                })}
            </div>
            {/* Preview of selected gradient */}
            <div className="mt-2 p-3 rounded-lg bg-gray-900">
                <div
                    className="text-center font-bold text-lg bg-clip-text text-transparent"
                    style={{
                        backgroundImage: ECHO_MOODS[selectedMood].gradient,
                        WebkitBackgroundClip: 'text',
                    }}
                >
                    Preview: {ECHO_MOODS[selectedMood].label}
                </div>
            </div>
        </div>
    );
});

// Custom badge component for visual indicator
const CustomFieldBadge = () => (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm mb-2">
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
        Custom Field
    </span>
);

// Custom text input field with badge
export const EchoTextInput = wrapFieldsWithMeta(({ input }) => {
    return (
        <div className="flex flex-col">
            <CustomFieldBadge />
            <input
                type="text"
                placeholder="Enter text to echo..."
                value={input.value || ''}
                onChange={input.onChange}
                className="px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent"
            />
        </div>
    );
});

// Custom number input field with badge
export const EchoCountInput = wrapFieldsWithMeta(({ input }) => {
    return (
        <div className="flex flex-col gap-2">
            <CustomFieldBadge />
            <div className="flex items-center gap-4">
                <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={input.value || 1}
                    onChange={(e) => input.onChange(parseInt(e.target.value) || 1)}
                    className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                />
                <input
                    type="number"
                    min="1"
                    max="20"
                    value={input.value || 1}
                    onChange={(e) => input.onChange(parseInt(e.target.value) || 1)}
                    className="w-16 px-2 py-1 border border-gray-200 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent text-center"
                />
            </div>
        </div>
    );
});
