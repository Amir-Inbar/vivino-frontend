export function ScaleRate(props) {
  const { percentage } = props;
  return (
    <td className="scale-container">
      <div class="scale">
        <div style={{ left: (percentage / 100) * 80 + "%" }}></div>
      </div>
    </td>
  );
}
