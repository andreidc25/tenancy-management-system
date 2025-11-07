


const InfoCard = ({ icon: Icon, label, value, colorClass }) => {
  return (
    <div
      className={`relative overflow-hidden ${colorClass} text-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1`}
    >
      {/* faint gradient overlay for depth */}
      <div className="absolute inset-0 bg-black/10 mix-blend-overlay pointer-events-none" />

      <div className="relative flex flex-col items-center text-center gap-2">
        <Icon className="w-10 h-10 opacity-90" />
        <h3 className="text-base font-medium opacity-95 tracking-wide">
          {label}
        </h3>
        <p className="text-3xl font-bold tracking-tight">{value}</p>
      </div>
    </div>
  );
};

export default InfoCard;
