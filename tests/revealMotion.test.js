import test from 'node:test';
import assert from 'node:assert/strict';
import { installRevealMotion } from '../src/lib/revealMotion.js';

function scene(reduced = false) {
    let intersection, mutation, preferenceListener;
    const media = { matches: reduced, addEventListener(_type, fn) { preferenceListener = fn; }, removeEventListener() { preferenceListener = null; } };
    class Element {
        nodeType = 1;
        classes = new Set();
        classList = { add: value => this.classes.add(value), remove: value => this.classes.delete(value) };
        animations = [];
        matches() { return true; }
        querySelectorAll() { return []; }
        animate(frames, options) { const animation = { frames, options, finished: new Promise(() => {}), cancelled: false, cancel() { this.cancelled = true; } }; this.animations.push(animation); return animation; }
    }
    const cards = [new Element(), new Element()];
    const root = { querySelectorAll: () => cards, contains: element => cards.includes(element) };
    const environment = {
        Element,
        matchMedia: () => media,
        IntersectionObserver: class {
            observed = new Set();
            disconnected = false;
            constructor(callback) { this.callback = callback; intersection = this; }
            observe(element) { this.observed.add(element); }
            unobserve(element) { this.observed.delete(element); }
            disconnect() { this.disconnected = true; }
        },
        MutationObserver: class {
            constructor(callback) { this.callback = callback; mutation = this; }
            observe() {}
            disconnect() { this.disconnected = true; }
        },
    };
    const cleanup = installRevealMotion(root, environment);
    return { cards, cleanup, Element, environment, root, get observer() { return intersection; }, enter(elements) { intersection.callback(elements.map(target => ({ target, isIntersecting: true }))); }, append() { const element = new Element(); cards.push(element); mutation.callback([{ addedNodes: [element], removedNodes: [] }]); return element; }, reduce() { media.matches = true; preferenceListener(); } };
}

test('cards rise 18px and fade in with a short stagger when entering view', () => {
    const view = scene();
    assert.ok(view.cards[0].classes.has('motion-wait'));
    view.enter(view.cards);
    assert.equal(view.cards[0].animations[0].frames[0].translate, '0 18px');
    assert.equal(view.cards[0].animations[0].options.delay, 0);
    assert.equal(view.cards[1].animations[0].options.delay, 45);
    assert.equal(view.observer.observed.size, 0);
    assert.equal(view.cards[0].classes.has('motion-wait'), false);
    view.cleanup();
});

test('appended batches animate without replaying previous cards', () => {
    const view = scene(); view.enter(view.cards);
    const appended = view.append(); view.enter([appended]);
    assert.equal(appended.animations.length, 1);
    assert.equal(view.cards[0].animations.length, 1);
    view.cleanup();
});

test('reduced motion keeps cards visible and does not register entrances', () => {
    const view = scene(true);
    assert.equal(view.observer.observed.size, 0);
    assert.equal(view.cards[0].classes.size, 0);
    const appended = view.append();
    assert.equal(appended.animations.length, 0);
    assert.equal(appended.classes.size, 0);
    view.cleanup();
});

test('changing to reduced motion cancels active animations and reveals waiting cards', () => {
    const view = scene(); view.enter([view.cards[0]]); view.reduce();
    assert.equal(view.cards[0].animations[0].cancelled, true);
    assert.equal(view.cards[1].classes.size, 0);
    view.cleanup();
});

test('cleanup reveals hidden cards and stops animations and observers', () => {
    const view = scene(); view.enter([view.cards[0]]); view.cleanup();
    assert.equal(view.cards[0].animations[0].cancelled, true);
    assert.equal(view.cards[1].classes.size, 0);
    assert.equal(view.observer.disconnected, true);
});

test('unsupported browsers leave all content visible', () => {
    const view = scene(); view.cleanup();
    const cleanup = installRevealMotion(view.root, {});
    assert.equal(typeof cleanup, 'function');
    assert.equal(view.cards[0].classes.size, 0);
});
