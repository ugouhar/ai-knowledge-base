export default function StatusMessage({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-gray-400 py-4">
      <span className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-gray-500 animate-spin shrink-0" />
      <span>{message}</span>
    </div>
  );
}
