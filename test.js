const assert = require('assert');

// Simple test to verify environment
console.log('Running smoke tests...');

try {
    // Assert that we have the required dependencies
    const express = require('express');
    assert(typeof express === 'function', 'Express should be a function');
    
    console.log('✅ Smoke tests passed!');
    process.exit(0);
} catch (error) {
    console.error('❌ Smoke tests failed:', error.message);
    process.exit(1);
}
