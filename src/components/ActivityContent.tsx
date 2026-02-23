import { User, FileText, MessageSquare, Bell } from 'lucide-react';

export function ActivityContent() {
  const activities = [
    {
      type: 'user',
      user: 'Dr. Sarah Smith',
      action: 'reviewed the assessment',
      time: '2 hours ago',
    },
    {
      type: 'document',
      user: 'System',
      action: 'generated compliance report',
      time: '5 hours ago',
    },
    {
      type: 'comment',
      user: 'PharmD Review Team',
      action: 'added a comment',
      time: '1 day ago',
    },
    {
      type: 'notification',
      user: 'System',
      action: 'sent reminder notification',
      time: '1 day ago',
    },
    {
      type: 'user',
      user: 'Dr. Michael Johnson',
      action: 'was assigned to the case',
      time: '2 days ago',
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user':
        return <User className="w-4 h-4" />;
      case 'document':
        return <FileText className="w-4 h-4" />;
      case 'comment':
        return <MessageSquare className="w-4 h-4" />;
      case 'notification':
        return <Bell className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-2">Activity Feed</h2>
        <p className="text-sm text-slate-500">Recent actions and updates</p>
      </div>

      <div className="space-y-3">
        {activities.map((activity, idx) => (
          <div
            key={idx}
            className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <div
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center border border-slate-200"
              style={{ color: '#00373a' }}
            >
              {getActivityIcon(activity.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-900">
                <span className="font-medium">{activity.user}</span> {activity.action}
              </p>
              <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
