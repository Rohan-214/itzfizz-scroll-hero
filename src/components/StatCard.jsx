import React from 'react';

export default function StatCard({ stat, index }) {
  return (
    <article className={`stat-card ${stat.position}`} data-stat={index}>
      <div className="stat-card__topline">
        <span className="stat-card__dot" />
        <span className="font-mono">IMPACT / 0{index + 1}</span>
      </div>
      <p className="stat-card__value">{stat.value}</p>
      <h2 className="stat-card__title">{stat.title}</h2>
      <p className="stat-card__detail">{stat.detail}</p>
    </article>
  );
}
