import { motion } from 'framer-motion';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay, isToday } from 'date-fns';
import { fr } from 'date-fns/locale';
import type { CheckIn } from '@shared/types';

interface HeatmapCalendarProps {
  checkIns: CheckIn[];
  habitColor: string;
}

const HeatmapCalendar = ({ checkIns, habitColor }: HeatmapCalendarProps) => {
  const today = new Date();
  const monthStart = startOfMonth(today);
  const monthEnd = endOfMonth(today);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getIntensity = (day: Date) => {
    const checkIn = checkIns.find((c) => isSameDay(new Date(c.date), day));
    if (!checkIn) return 0;
    return checkIn.completed ? 1 : 0;
  };

  const getColorIntensity = (intensity: number) => {
    if (intensity === 0) return 'bg-gray-100';
    return 'bg-opacity-100';
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium text-gray-700">
        Calendrier - {format(today, 'MMMM yyyy', { locale: fr })}
      </h4>
      <div className="grid grid-cols-7 gap-2">
        {/* Days of week */}
        {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
          <div key={i} className="text-xs text-gray-500 text-center font-medium">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((day, i) => {
          const intensity = getIntensity(day);
          const today = isToday(day);

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.01 }}
              className={`
                aspect-square rounded-lg flex items-center justify-center text-xs
                ${intensity > 0 ? `${getColorIntensity(intensity)} text-white` : 'bg-gray-100 text-gray-400'}
                ${today ? 'ring-2 ring-primary-500 ring-offset-1' : ''}
              `}
              style={{
                backgroundColor: intensity > 0 ? habitColor : undefined,
              }}
            >
              {format(day, 'd')}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default HeatmapCalendar;
