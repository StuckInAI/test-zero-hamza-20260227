type ResetButtonProps = {
  onReset: () => void;
  disabled: boolean;
};

export default function ResetButton({ onReset, disabled }: ResetButtonProps) {
  return (
    <button
      onClick={onReset}
      disabled={disabled}
      className="w-full py-3 px-4 bg-gray-800 dark:bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-900 dark:hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-6"
    >
      Reset Game
    </button>
  );
}