<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
                xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9">

  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>

  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <title>XML Sitemap - ai-characters.org</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <style type="text/css">
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            color: #e0e0e0;
            background: #0a0e27;
            margin: 0;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #1dd1a1 0%, #10ac84 100%);
            padding: 30px;
            border-radius: 10px;
            margin-bottom: 30px;
            color: white;
          }
          h1 {
            margin: 0 0 10px 0;
            font-size: 32px;
          }
          .intro {
            font-size: 16px;
            opacity: 0.9;
          }
          .stats {
            display: flex;
            gap: 20px;
            margin-bottom: 30px;
            flex-wrap: wrap;
          }
          .stat-box {
            background: #1a1f3a;
            padding: 20px;
            border-radius: 8px;
            flex: 1;
            min-width: 200px;
            border: 1px solid #2d3561;
          }
          .stat-number {
            font-size: 36px;
            font-weight: bold;
            color: #1dd1a1;
            margin-bottom: 5px;
          }
          .stat-label {
            font-size: 14px;
            color: #8892b0;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            background: #1a1f3a;
            border-radius: 8px;
            overflow: hidden;
          }
          th {
            background: #2d3561;
            color: #1dd1a1;
            padding: 15px;
            text-align: left;
            font-weight: 600;
          }
          td {
            padding: 12px 15px;
            border-bottom: 1px solid #2d3561;
          }
          tr:hover {
            background: #252b4f;
          }
          a {
            color: #1dd1a1;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .priority-high { color: #1dd1a1; font-weight: bold; }
          .priority-medium { color: #54a0ff; }
          .priority-low { color: #8892b0; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🗺️ XML Sitemap</h1>
          <p class="intro">ai-characters.org - AI Character &amp; Companion Platform Reviews</p>
        </div>
        
        <div class="stats">
          <div class="stat-box">
            <div class="stat-number"><xsl:value-of select="count(sitemap:urlset/sitemap:url)"/></div>
            <div class="stat-label">Total URLs</div>
          </div>
          <div class="stat-box">
            <div class="stat-number">21</div>
            <div class="stat-label">AI Platforms</div>
          </div>
          <div class="stat-box">
            <div class="stat-number">67</div>
            <div class="stat-label">SEO Pages</div>
          </div>
          <div class="stat-box">
            <div class="stat-number">210+</div>
            <div class="stat-label">Comparisons</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th style="width: 60%">URL</th>
              <th style="width: 15%">Last Modified</th>
              <th style="width: 15%">Change Frequency</th>
              <th style="width: 10%">Priority</th>
            </tr>
          </thead>
          <tbody>
            <xsl:for-each select="sitemap:urlset/sitemap:url">
              <tr>
                <td>
                  <a href="{sitemap:loc}">
                    <xsl:value-of select="sitemap:loc"/>
                  </a>
                </td>
                <td>
                  <xsl:value-of select="sitemap:lastmod"/>
                </td>
                <td>
                  <xsl:value-of select="sitemap:changefreq"/>
                </td>
                <td>
                  <xsl:attribute name="class">
                    <xsl:choose>
                      <xsl:when test="sitemap:priority &gt;= 0.8">priority-high</xsl:when>
                      <xsl:when test="sitemap:priority &gt;= 0.5">priority-medium</xsl:when>
                      <xsl:otherwise>priority-low</xsl:otherwise>
                    </xsl:choose>
                  </xsl:attribute>
                  <xsl:value-of select="sitemap:priority"/>
                </td>
              </tr>
            </xsl:for-each>
          </tbody>
        </table>
      </body>
    </html>
  </xsl:template>

</xsl:stylesheet>
