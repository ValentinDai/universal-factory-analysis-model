import React, { useState } from 'react'

export default function ROICalculator() {
  const [products, setProducts] = useState([
    { name: '瓦楞纸箱', salePrice: 1.8, costPrice: 0.95, ratio: 60 },
    { name: '塑料托盘', salePrice: 3.2, costPrice: 2.1, ratio: 30 },
    { name: '泡沫板', salePrice: 2.1, costPrice: 1.1, ratio: 10 }
  ])
  const [volume, setVolume] = useState(10000000)

  const totalRevenue = products.reduce(
    (sum, p) => sum + (p.salePrice * (p.ratio / 100) * volume),
    0
  )

  const totalCost = products.reduce(
    (sum, p) => sum + (p.costPrice * (p.ratio / 100) * volume),
    0
  )

  const netProfit = totalRevenue - totalCost
  const roi = totalCost > 0 ? netProfit / totalCost : 0

  const updateProduct = (i, field, value) => {
    const updated = [...products]
    updated[i][field] = field === 'name' ? value : parseFloat(value)
    setProducts(updated)
  }

  return (
    <div>
      <h2>产品结构与ROI计算</h2>
      <table border="1" cellPadding="6" style={{ marginBottom: '12px' }}>
        <thead>
          <tr>
            <th>产品名称</th>
            <th>销售单价 ($)</th>
            <th>成本单价 ($)</th>
            <th>占比 (%)</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr key={i}>
              <td><input value={p.name} onChange={(e) => updateProduct(i, 'name', e.target.value)} /></td>
              <td><input type="number" value={p.salePrice} onChange={(e) => updateProduct(i, 'salePrice', e.target.value)} /></td>
              <td><input type="number" value={p.costPrice} onChange={(e) => updateProduct(i, 'costPrice', e.target.value)} /></td>
              <td><input type="number" value={p.ratio} onChange={(e) => updateProduct(i, 'ratio', e.target.value)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        年产量（个）：<input type="number" value={volume} onChange={(e) => setVolume(parseInt(e.target.value))} />
      </div>
      <div style={{ marginTop: '20px' }}>
        <p>年销售收入：<strong>${totalRevenue.toLocaleString()}</strong></p>
        <p>年变动成本：<strong>${totalCost.toLocaleString()}</strong></p>
        <p>年净利润：<strong>${netProfit.toLocaleString()}</strong></p>
        <p>ROI：<strong>{roi.toFixed(2)}</strong></p>
      </div>
    </div>
  )
}
