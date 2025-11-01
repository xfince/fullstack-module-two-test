export interface User {
  id: string;
  name: string;
  email: string;
  role: 'member' | 'admin';
  avatar?: string;
  isActive?: boolean;
  createdAt?: string;
  lastLogin?: string;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  assignedTo?: User;
  createdBy: User;
  comments: Comment[];
  tags?: string[];
  isArchived?: boolean;
  createdAt: string;
  updatedAt: string;
  daysUntilDue?: number;
  isOverdue?: boolean;
}

export interface Comment {
  _id: string;
  user: User;
  text: string;
  createdAt: string;
}

export interface Notification {
  _id: string;
  user: string;
  message: string;
  type: 'task-assigned' | 'task-updated' | 'task-completed' | 'comment-added' | 'due-date-reminder';
  relatedTask?: Task;
  isRead: boolean;
  readAt?: string;
  createdAt: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: any) => Promise<void>;
}

export interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
}