import React, { useState } from "react";

const EnterIcon = (
  <svg
    fill="#ffffff"
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
  >
    <path d="M19,6a1,1,0,0,0-1,1v4a1,1,0,0,1-1,1H7.41l1.3-1.29A1,1,0,0,0,7.29,9.29l-3,3a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l3,3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L7.41,14H17a3,3,0,0,0,3-3V7A1,1,0,0,0,19,6Z" />
  </svg>
);

const BackSpaceIcon = (
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    fill="#ffffff"
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8"
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M6.87114 19.4986C7.80085 20 8.91458 20 11.142 20H13.779C17.6544 20 19.5921 20 20.7961 18.8284C22 17.6569 22 15.7712 22 12C22 8.22876 22 6.34315 20.7961 5.17157C19.5921 4 17.6544 4 13.779 4H11.142C8.91458 4 7.80085 4 6.87114 4.50143C5.94144 5.00286 5.35117 5.92191 4.17061 7.76001L3.48981 8.82001C2.4966 10.3664 2 11.1396 2 12C2 12.8604 2.4966 13.6336 3.48981 15.18L4.17061 16.24C5.35117 18.0781 5.94144 18.9971 6.87114 19.4986ZM11.0303 8.96967C10.7374 8.67678 10.2625 8.67678 9.96965 8.96967C9.67676 9.26256 9.67676 9.73744 9.96965 10.0303L11.9393 12L9.96967 13.9697C9.67678 14.2626 9.67678 14.7374 9.96967 15.0303C10.2626 15.3232 10.7374 15.3232 11.0303 15.0303L13 13.0607L14.9696 15.0303C15.2625 15.3232 15.7374 15.3232 16.0303 15.0303C16.3232 14.7374 16.3232 14.2625 16.0303 13.9697L14.0606 12L16.0303 10.0304C16.3232 9.73746 16.3232 9.26258 16.0303 8.96969C15.7374 8.6768 15.2625 8.6768 14.9696 8.96969L13 10.9394L11.0303 8.96967Z"
      fill="#ffff"
    />
  </svg>
);

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

const Key = ({
  value,
  onClick,
  disabled = false,
  className = "",
}: {
  value: string | React.ReactNode;
  onClick: (value: string | React.ReactNode) => void;
  disabled?: boolean;
  className?: string;
}) => (
  <button
    className={`
        flex items-center justify-center m-0.5 rounded-md font-bold
        px-1.5 md:px-4 h-10 sm:h-[58px] text-xs sm:text-sm
        ${
          disabled
            ? "bg-gray-600 text-gray-300 cursor-not-allowed"
            : "bg-gray-300 text-black hover:bg-gray-200 active:bg-gray-500"
        }
        ${className}
      `}
    onClick={() => !disabled && onClick(value)}
    disabled={disabled}
  >
    {value}
  </button>
);

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

  const handleBaseKeyPress = (baseChar: string) => {
    setSelectedBase(baseChar);
  };

  const handleOrderSelect = (fidelChar: string) => {
    onKeyPress(fidelChar);
  };

  const currentFidelOrders = selectedBase
    ? fidelMapping[selectedBase] || Array(7).fill("")
    : Array(7).fill("");

  const rows = [
    keyboardLayout.slice(0, 12),
    keyboardLayout.slice(12, 25),
    keyboardLayout.slice(25), // last row
  ];

  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-fit flex justify-center items-center">
        <div className="flex flex-wrap justify-center">
          {currentFidelOrders.map((fidel, index) => (
            <Key
              key={index}
              value={fidel ? fidel : "--"}
              onClick={() => handleOrderSelect(fidel)}
              disabled={!selectedBase || fidel === ""}
              className="flex-grow sm:flex-grow-0 !bg-black text-gray-200"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-wrap justify-center items-center w-full"
          >
            {rowIndex === 2 && (
              <Key
                value={BackSpaceIcon}
                onClick={onBackspace}
                className="!w-fit !px-4 !bg-black"
              />
            )}

            {row.map((char, charIndex) => (
              <Key
                key={charIndex}
                value={char}
                onClick={() => handleBaseKeyPress(char)}
                className={
                  selectedBase === char
                    ? "bg-gray-900  text-white hover:bg-gray-900 hover:text-white"
                    : ""
                }
              />
            ))}
            {rowIndex === 2 && (
              <Key
                value={EnterIcon}
                onClick={onEnter}
                className="!px-4 !w-fit !bg-black"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AmharicKeyboard;
