<script lang="ts">
  import { WheelPickerService } from './wheelPickerService';

  let names = $state<string[]>([]);
  let newName = $state('');
  let isSpinning = $state(false);
  let winner = $state<string | null>(null);
  let error = $state<string | null>(null);

  const wheelNames = $derived([...names]);
  const segmentAngle = $derived(wheelNames.length > 0 ? 360 / wheelNames.length : 360);

  const colors = [
    '#4CAF50', // green
    '#8BC34A', // light green
    '#CDDC39', // lime
    '#FFEB3B', // yellow
    '#FFC107', // amber
    '#FF9800', // orange
  ];

  function getSegmentColor(index: number): string {
    return colors[index % colors.length];
  }

  function addName() {
    if (!newName.trim()) {
      error = 'Please enter a name';
      return;
    }
    
    names = [...names, newName.trim()];
    newName = '';
    error = null;
  }

  async function spinWheel() {
    try {
      if (names.length === 0) {
        throw new Error('Add names before spinning');
      }

      isSpinning = true;
      winner = null;
      winner = await WheelPickerService.selectWinner(names);
    } catch (e) {
      error = e instanceof Error ? e.message : 'An error occurred';
    } finally {
      isSpinning = false;
    }
  }
</script>

<div class="wheel-picker">
  <div class="input-section">
    <input
      oninput={e => newName = e.currentTarget.value}
      placeholder="Enter a name..."
      type="text"
      value={newName}
    />
    <button onclick={addName}>Add Name</button>
  </div>

  {#if error}
    <p class="error">{error}</p>
  {/if}

  <div class="wheel-container">
    {#if wheelNames.length === 0}
      <p>Add names to start spinning!</p>
    {:else}
      <div
        class="wheel"
        class:spinning={isSpinning}
      >
        {#each wheelNames as name, index (name)}
          <div
            style="
              --rotation: {index * segmentAngle}deg;
              --skew: {Math.min(90 - segmentAngle, 45)}deg;
              --background: {getSegmentColor(index)};
            "
            class="segment"
          >
            <div class="segment-content">
              {name}
            </div>
          </div>
        {/each}
        <div class="wheel-center">
          <button 
            class="spin-button"
            disabled={isSpinning || wheelNames.length === 0}
            onclick={spinWheel}
          >
            SPIN
          </button>
        </div>
      </div>
    {/if}
  </div>

  {#if winner}
    <div class="winner">
      <h2>Winner: {winner}</h2>
    </div>
  {/if}

  <div class="names-list">
    {#each names as name, index (name)}
      <div class="name-item">
        <span>{name}</span>
        <button 
          class="remove-button"
          onclick={() => names = names.filter((_, i) => i !== index)}
        >
          ×
        </button>
      </div>
    {/each}
  </div>
</div>

<style lang="scss">
  .wheel-picker {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
  }

  .input-section {
    display: flex;
    gap: 1rem;

    input {
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 200px;
    }

    button {
      padding: 0.5rem 1rem;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background-color: #45a049;
      }
    }
  }

  .error {
    color: #f44336;
  }

  .wheel-container {
    width: 500px;
    height: 500px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .wheel {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 50%;
    border: 2px solid #333;
    transition: transform 3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: rotate(0deg);

    &.spinning {
      transform: rotate(1800deg);
    }
  }

  .segment {
    position: absolute;
    width: 50%;
    height: 50%;
    left: 50%;
    top: 50%;
    transform-origin: 0% 0%;
    transform: rotate(var(--rotation)) skew(var(--skew));
    background: var(--background);
    
    &::before {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.1);
    }
  }

  .segment-content {
    position: absolute;
    left: 50%;
    top: 25%;
    transform: skew(calc(var(--skew) * -1)) rotate(calc(var(--rotation) * -1)) translate(-50%, -50%);
    color: white;
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
    white-space: nowrap;
  }

  .wheel-center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    background: #333;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }

  .spin-button {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #1976D2;
    color: white;
    border: none;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover:not(:disabled) {
      background: #1565C0;
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }

  .names-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 300px;
    width: 100%;
  }

  .name-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    background: #f5f5f5;
    border-radius: 4px;

    .remove-button {
      background: none;
      border: none;
      color: #f44336;
      font-size: 1.2rem;
      cursor: pointer;
      padding: 0 0.5rem;

      &:hover {
        color: #d32f2f;
      }
    }
  }

  .winner {
    text-align: center;
    padding: 1rem;
    background-color: #4CAF50;
    color: white;
    border-radius: 4px;
    
    h2 {
      margin: 0;
    }
  }
</style>