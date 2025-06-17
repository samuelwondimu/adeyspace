import React, { useState } from "react";

// fidelData.ts
export const fidelMapping: Record<string, string[]> = {
  ሀ: ["ሀ", "ሁ", "ሂ", "ሃ", "ሄ", "ህ", "ሆ"],
  ለ: ["ለ", "ሉ", "ሊ", "ላ", "ሌ", "ል", "ሎ"],
  ሐ: ["ሐ", "ሑ", "ሒ", "ሓ", "ሔ", "ሕ", "ሖ"],
  መ: ["መ", "ሙ", "ሚ", "ማ", "ሜ", "ም", "ሞ"],
  ሠ: ["ሠ", "ሡ", "ሢ", "ሣ", "ሤ", "ሥ", "ሦ"],
  ረ: ["ረ", "ሩ", "ሪ", "ራ", "ሬ", "ር", "ሮ"],
  ሰ: ["ሰ", "ሱ", "ሲ", "ሳ", "ሴ", "ስ", "ሶ"],
  ሸ: ["ሸ", "ሹ", "ሺ", "ሻ", "ሼ", "ሽ", "ሾ"],
  ቀ: ["ቀ", "ቁ", "ቂ", "ቃ", "ቄ", "ቅ", "ቆ"],
  በ: ["በ", "ቡ", "ቢ", "ባ", "ቤ", "ብ", "ቦ"],
  ተ: ["ተ", "ቱ", "ቲ", "ታ", "ቴ", "ት", "ቶ"],
  ቸ: ["ቸ", "ቹ", "ቺ", "ቻ", "ቼ", "ች", "ቾ"],
  ኀ: ["ኀ", "ኁ", "ኂ", "ኃ", "ኄ", "ኅ", "ኆ"], // Note: ኀ often mapped to ኸ
  ነ: ["ነ", "ኑ", "ኒ", "ና", "ኔ", "ን", "ኖ"],
  ኘ: ["ኘ", "ኙ", "ኚ", "ኛ", "ኜ", "ኝ", "ኞ"],
  አ: ["አ", "ኡ", "ኢ", "ኣ", "ኤ", "እ", "ኦ"], // Vowels often represented this way
  ከ: ["ከ", "ኩ", "ኪ", "ካ", "ኬ", "ክ", "ኮ"],
  ኸ: ["ኸ", "ኹ", "ኺ", "ኻ", "ኼ", "ኽ", "ኾ"],
  ወ: ["ወ", "ዉ", "ዊ", "ዋ", "ዌ", "ው", "ዎ"],
  ዐ: ["ዐ", "ዑ", "ዒ", "ዓ", "ዔ", "ዕ", "ዖ"], // Vowels often represented this way
  ዘ: ["ዘ", "ዙ", "ዚ", "ዛ", "ዜ", "ዝ", "ዞ"],
  ዠ: ["ዠ", "ዡ", "ዢ", "ዣ", "ዤ", "ዥ", "ዦ"],
  የ: ["የ", "ዩ", "ዪ", "ያ", "ዬ", "ይ", "ዮ"],
  ደ: ["ደ", "ዱ", "ዲ", "ዳ", "ዴ", "ድ", "ዶ"],
  ጀ: ["ጀ", "ጁ", "ጂ", "ጃ", "ጄ", "ጅ", "ጆ"],
  ገ: ["ገ", "ጉ", "ጊ", "ጋ", "ጌ", "ግ", "ጎ"],
  ጠ: ["ጠ", "ጡ", "ጢ", "ጣ", "ጤ", "ጥ", "ጦ"],
  ጨ: ["ጨ", "ጩ", "ጪ", "ጫ", "ጬ", "ጭ", "ጮ"],
  ጰ: ["ጰ", "ጱ", "ጲ", "ጳ", "ጴ", "ጵ", "ጶ"], // Pi
  ጸ: ["ጸ", "ጹ", "ጺ", "ጻ", "ጼ", "ጽ", "ጾ"],
  ፀ: ["ፀ", "ፁ", "ፂ", "ፃ", "ፄ", "ፅ", "ፆ"], // Tsa (variant)
  ፈ: ["ፈ", "ፉ", "ፊ", "ፋ", "ፌ", "ፍ", "ፎ"],
  ፐ: ["ፐ", "ፑ", "ፒ", "ፓ", "ፔ", "ፕ", "ፖ"],
  ቨ: ["ቨ", "ቩ", "ቪ", "ቫ", "ቬ", "ቭ", "ቮ"], // Va (less common base, but exists)
};

// Layout of the base keys for the keyboard display
export const keyboardLayout: string[] = [
  "ሀ",
  "ለ",
  "ሐ",
  "መ",
  "ሠ",
  "ረ",
  "ሰ",
  "ሸ",
  "ቀ",
  "በ",
  "ተ",
  "ቸ",
  "ኀ",
  "ነ",
  "ኘ",
  "አ",
  "ከ",
  "ኸ",
  "ወ",
  "ዐ",
  "ዘ",
  "ዠ",
  "የ",
  "ደ",
  "ጀ",
  "ገ",
  "ጠ",
  "ጨ",
  "ጰ",
  "ጸ",
  "ፀ",
  "ፈ",
  "ፐ",
  "ቨ", // Added a common 'v' sound
];


interface AmharicKeyboardProps {
  onKeyPress: (key: string) => void;
  onEnter: () => void;
  onBackspace: () => void;
}

function AmharicKeyboard({
  onKeyPress,
  onBackspace,
  onEnter,
}: AmharicKeyboardProps) {
  const [selectedBase, setSelectedBase] = useState<string | null>(null);

  const Key = ({
    value,
    onClick,
    wide = false,
    small = false,
    disabled = false,
    className = "",
  }: {
    value: string;
    onClick: (value: string) => void;
    wide?: boolean;
    small?: boolean;
    disabled?: boolean;
    className?: string;
  }) => (
    <button
      className={`
        flex items-center justify-center m-0.5 rounded-md font-bold
        ${
          disabled
            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
            : "bg-gray-700 hover:bg-gray-900 active:bg-gray-500"
        }
        ${
          wide
            ? "w-20 sm:w-24 h-12 sm:h-14 text-sm sm:text-base"
            : small
              ? "w-8 h-8 sm:w-10 sm:h-10 text-xs sm:text-sm"
              : "w-10 h-12 sm:w-12 sm:h-16 text-base sm:text-xl"
        }
        ${className}
      `}
      onClick={() => !disabled && onClick(value)}
      disabled={disabled}
    >
      {value}
    </button>
  );

  const handleBaseKeyPress = (baseChar: string) => {
    setSelectedBase(baseChar);
  };

  const handleOrderSelect = (fidelChar: string) => {
    onKeyPress(fidelChar);
  };

  const currentFidelOrders = selectedBase
    ? fidelMapping[selectedBase] || Array(7).fill("")
    : Array(7).fill("");

  return (
    <div className="w-full px-2 flex flex-col justify-center items-center">
      {/* Fidel Order Selection Area */}
      <div className="w-fit flex justify-center items-center border-2 rounded-2xl px-2 m-2 border-gray-600">
        <div className="flex flex-wrap justify-center gap-1 px-1 py-2">
          {currentFidelOrders.map((fidel, index) => (
            <Key
              key={index}
              value={fidel}
              onClick={() => handleOrderSelect(fidel)}
              disabled={!selectedBase || fidel === ""}
              className="flex-grow sm:flex-grow-0"
            />
          ))}
        </div>
      </div>

      {/* Main Keyboard */}
      <div className="flex flex-wrap justify-center items-center gap-1 px-2">
        {keyboardLayout.map((char, index) => (
          <Key
            key={index}
            value={char}
            onClick={() => handleBaseKeyPress(char)}
            className={selectedBase === char ? "ring-2 ring-blue-400" : ""}
          />
        ))}
      </div>
      {/* Control Row: Enter, Backspace - Always visible */}
      <div className="flex justify-center my-1 mt-2 w-full">
        <Key value="Enter" onClick={onEnter} wide className="flex-grow mx-1" />
        <Key
          value="Backspace"
          onClick={onBackspace}
          wide
          className="flex-grow mx-1"
        />
      </div>
    </div>
  );
}

export default AmharicKeyboard;
