<template>
  <div id="app">
    <div class="navbar">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="['tab-button', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <TypstEditor v-if="activeTab === 'editor'" />
    <TypstTest v-if="activeTab === 'simple'" />
    <TypstChartTest v-if="activeTab === 'charts'" />
  </div>
</template>

<script>
import TypstTest from './TypstTest.vue';
import TypstChartTest from './TypstChartTest.vue';
import TypstEditor from './TypstEditor.vue';

export default {
  name: 'App',
  components: {
    TypstTest,
    TypstChartTest,
    TypstEditor
  },
  data() {
    return {
      activeTab: 'editor',
      tabs: [
        { id: 'editor', label: '✏️ Live Editor' },
        { id: 'simple', label: '📝 Basic Test' },
        { id: 'charts', label: '📊 Chart Test' }
      ]
    };
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #f5f5f5;
}

#app {
  min-height: 100vh;
}

.navbar {
  background-color: #fff;
  border-bottom: 2px solid #e0e0e0;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.tab-button {
  padding: 0.75rem 1.5rem;
  border: none;
  background-color: transparent;
  color: #666;
  cursor: pointer;
  font-size: 1rem;
  border-bottom: 3px solid transparent;
  transition: all 0.3s;
}

.tab-button:hover {
  color: #333;
}

.tab-button.active {
  color: #007bff;
  border-bottom-color: #007bff;
}
</style>
