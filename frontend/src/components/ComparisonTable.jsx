import React from 'react';
import { Check, X } from 'lucide-react';
import '../styles/ComparisonTable.css';

const ComparisonTable = () => {
  const features = [
    {
      name: 'Free Access',
      platforms: {
        'Lovescape': true,
        'Character.AI': true,
        'Replika': true,
        'Nomi.ai': false,
        'Candy AI': false
      }
    },
    {
      name: 'Voice Chat',
      platforms: {
        'Lovescape': true,
        'Character.AI': false,
        'Replika': true,
        'Nomi.ai': true,
        'Candy AI': true
      }
    },
    {
      name: 'Image Generation',
      platforms: {
        'Lovescape': true,
        'Character.AI': false,
        'Replika': false,
        'Nomi.ai': true,
        'Candy AI': true
      }
    },
    {
      name: 'Custom Personality',
      platforms: {
        'Lovescape': true,
        'Character.AI': true,
        'Replika': true,
        'Nomi.ai': true,
        'Candy AI': true
      }
    },
    {
      name: 'Multiple Characters',
      platforms: {
        'Lovescape': true,
        'Character.AI': true,
        'Replika': false,
        'Nomi.ai': true,
        'Candy AI': false
      }
    },
    {
      name: 'Mobile App',
      platforms: {
        'Lovescape': true,
        'Character.AI': true,
        'Replika': true,
        'Nomi.ai': true,
        'Candy AI': true
      }
    }
  ];

  const platformNames = ['Lovescape', 'Character.AI', 'Replika', 'Nomi.ai', 'Candy AI'];

  return (
    <div className="comparison-section">
      <div className="comparison-header">
        <h2 className="comparison-title">Platform Comparison</h2>
        <p className="comparison-subtitle">Compare features across top AI character platforms</p>
      </div>
      
      <div className="comparison-table-wrapper">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="feature-header">Feature</th>
              {platformNames.map((name) => (
                <th key={name} className="platform-header">{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((feature, idx) => (
              <tr key={idx}>
                <td className="feature-name">{feature.name}</td>
                {platformNames.map((platform) => (
                  <td key={platform} className="feature-value">
                    {feature.platforms[platform] ? (
                      <div className="check-icon">
                        <Check size={20} />
                      </div>
                    ) : (
                      <div className="x-icon">
                        <X size={20} />
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonTable;