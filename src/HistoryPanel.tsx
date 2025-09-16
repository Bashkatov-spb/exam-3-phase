import React from 'react';
import { HistoryEntry } from './types';

interface HistoryPanelProps {
  history: HistoryEntry[];
  onClearHistory: () => void;
  isVisible: boolean;
  onToggleVisibility: () => void;
}

function HistoryPanel({ 
  history, 
  onClearHistory, 
  isVisible, 
  onToggleVisibility 
}: HistoryPanelProps): JSX.Element {
  return (
    <div className="history-panel">
      <button
        type="button"
        onClick={onToggleVisibility}
        className="history-toggle-btn"
        aria-label={isVisible ? "Скрыть историю" : "Показать историю"}
        aria-expanded={isVisible}
      >
        📋 История {isVisible ? '▼' : '▶'}
      </button>
      
      {isVisible && (
        <div className="history-content">
          <div className="history-header">
            <h3>История операций</h3>
            <button
              type="button"
              onClick={onClearHistory}
              className="clear-history-btn"
              disabled={history.length === 0}
              aria-label="Очистить историю"
            >
              🗑️ Очистить
            </button>
          </div>
          
          <div className="history-list" role="list">
            {history.length === 0 ? (
              <div className="history-empty">
                История пуста
              </div>
            ) : (
              history.map((entry, index) => (
                <div 
                  key={entry.id} 
                  className="history-item"
                  role="listitem"
                  aria-label={`Операция ${index + 1}: ${entry.operation} на ${entry.step}, результат: ${entry.result}`}
                >
                  <span className="history-operation">
                    {entry.operation === 'increment' ? '➕' : 
                     entry.operation === 'decrement' ? '➖' : 
                     entry.operation === 'reset' ? '🔄' : '❓'}
                  </span>
                  <span className="history-details">
                    {entry.operation === 'increment' && `+${entry.step}`}
                    {entry.operation === 'decrement' && `-${entry.step}`}
                    {entry.operation === 'reset' && 'Сброс'}
                  </span>
                  <span className="history-result">
                    → {entry.result}
                  </span>
                  <span className="history-time">
                    {new Date(entry.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default HistoryPanel;
