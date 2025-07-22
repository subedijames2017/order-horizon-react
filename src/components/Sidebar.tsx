import { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  CreditCard, 
  Building2, 
  Ticket, 
  Gift, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: ShoppingCart, label: 'Manage Orders', active: false },
  { icon: Package, label: 'Inventories', active: false },
  { icon: CreditCard, label: 'Payments', active: false },
  { icon: Building2, label: 'Corporates', active: false },
  { icon: Ticket, label: 'Tickets', active: false },
  { icon: Gift, label: 'Incentives', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  return (
    <div className={cn(
      "bg-slate-800 text-white transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-slate-700">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <div>
              <div className="text-sm font-semibold">PARAMOUNT</div>
              <div className="text-xs text-slate-400">WIRES & CABLES</div>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-cyan-500 rounded flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-sm">P</span>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                className={cn(
                  "w-full flex items-center px-3 py-2.5 rounded-lg transition-colors",
                  item.active 
                    ? "bg-slate-700 text-cyan-400" 
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                )}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="ml-3 text-sm font-medium">{item.label}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Toggle Button */}
      <div className="p-2 border-t border-slate-700">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-slate-700 transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
}