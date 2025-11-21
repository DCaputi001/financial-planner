/**
 * @file app.spec.ts
 * @description
 * Unit tests for the root App component. These tests validate that:
 *  - The component can be successfully created.
 *  - The rendered template contains the expected title text.
 *
 * This file uses Angular’s TestBed utilities to configure a lightweight
 * testing module and instantiate the App component in isolation.
 */

import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {

  /**
   * Test Module Setup
   * ------------------------------------------------------------
   * Before each test, configure the Angular testing environment by:
   *  - Importing the App component (standalone component)
   *  - Compiling the testing module so Angular can instantiate the component
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],   // Standalone components use "imports" instead of declarations
    }).compileComponents();
  });

  /**
   * Test Case: Component Creation
   * ------------------------------------------------------------
   * Ensures the App root component can be instantiated without errors.
   * This verifies that:
   *  - Dependency injection is resolved
   *  - The component definition is valid
   *  - Angular can successfully create the component fixture
   */
  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  /**
   * Test Case: Title Rendering
   * ------------------------------------------------------------
   * Detects changes in the component template and ensures that
   * the expected title appears in the DOM. This verifies:
   *  - Rendering logic
   *  - Template correctness
   *  - Static content is available to the user
   */
  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges(); // triggers template rendering
    const compiled = fixture.nativeElement as HTMLElement;

    // Checks for the presence of the text "Hello, frontend" inside any <h1> element
    expect(compiled.querySelector('h1')?.textContent)
      .toContain('Hello, frontend');
  });
});