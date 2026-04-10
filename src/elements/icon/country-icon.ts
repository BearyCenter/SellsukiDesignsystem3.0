// This file is generated, do not modify!
// script: npm run generate:country-icon

import { consume } from "@lit/context";
import { LitElement, TemplateResult, css, html, svg, nothing } from "lit";
import { property } from "lit/decorators.js";
import { Size, Theme, cssVar,  parseThemeToCssVariables, parseVariables } from "../../types/theme";
import { themeContext } from "../../contexts/theme";

export class CountryIcon extends LitElement {
  static registeredName = "ssk-country-icon";

  @consume({ context: themeContext, subscribe: true })
  @property({ attribute: false })
  public theme?: Theme;

  @property({ type: String })
  size: Size = "md";
  @property({ type: String })
  padding?: Size;
  @property({ type: String })
  margin?: string | undefined;
 
  @property({ type: String })
  width?: string | undefined;
  @property({ type: String })
  height?: string | undefined;

  @property({ type: Boolean })
  hidden = false;

  @property({ type: String})
  cursor?: string | undefined;

  // Event
  @property({ attribute: false })
  onClick?: () => void;

  @property({ type: String })
  code: string = "";

  @property({ type: String })
  iconName: string = "";

  static svgs: Record<string, TemplateResult> = {
    "ZWE": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6361)">
<rect width="21" height="15" rx="3" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 2H21V13H0V2Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 4H21V11H0V4Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 6H21V9H0V6Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 0L12 7.5L1 15H0V0" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L11 7.5L0 15V0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.50007 8.75L3.03007 9.523L3.31007 7.886L2.12207 6.726L3.76507 6.489L4.50007 5L5.23507 6.49L6.87807 6.727L5.68807 7.887L5.96807 9.523" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 9H6V8L5 7C5 7 5 6 4 6H3L4 7L3 9Z" fill="#FFDA2C"/>
</g>
<defs>
<clipPath id="clip0_20468_6361">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "ZMB": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6369)">
<rect width="21" height="15" rx="3" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19 6H21V15H19V6Z" fill="#FF6C2D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17 6H19V15H17V6Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 6H17V15H15V6Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 3L17 4L18 5L19 4L22 3H18L17 2V3H14Z" fill="#FF6C2D"/>
</g>
<defs>
<clipPath id="clip0_20468_6369">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "YEM": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6375)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#AF010D"/>
</g>
<defs>
<clipPath id="clip0_20468_6375">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "VGB": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6379)">
<rect width="21" height="15" rx="3" fill="white"/>
<mask id="mask0_20468_6379" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="21" height="15">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="white"/>
</mask>
<g mask="url(#mask0_20468_6379)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.25 9L16 9.75L13.75 12L13 11.25L15.25 9Z" fill="#3A99FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.75 9L6 9.75L8.25 12L9 11.25L6.75 9Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 9H8V10L6 11L7 9Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 7H4V10H3V7ZM17 7H18V10H17V7Z" fill="#3A99FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 4V3H9V4L10 5V7H11V4ZM4 4L8 5V8L4 5V4ZM17 4L13 5V8L17 5V4ZM8 11L10.5 12L13 11L12 10H9L8 11Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 9H13V10L15 11L14 9Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 6H13V10L10.5 11L8 10V6Z" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 7H10V10H9V7ZM11 7H12V10H11V7Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 5H13V7H8V5Z" fill="#232C80"/>
</g>
</g>
<defs>
<clipPath id="clip0_20468_6379">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "VNM": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5021 9.33L8.41207 10.43L8.81207 8.103L7.12207 6.456L9.45807 6.116L10.5021 4L11.5471 6.116L13.8821 6.456L12.1921 8.103L12.5921 10.429" fill="#FFDA2C"/>
</svg>
`, "VEN": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6396)">
<rect width="21" height="15" rx="3" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 8H7V9H6V8ZM8 7H9V8H8V7ZM12 7H13V8H12V7ZM14 8H15V9H14V8ZM10 6H11V7H10V6Z" fill="#BCC9F0"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#FFDA2C"/>
</g>
<defs>
<clipPath id="clip0_20468_6396">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "VUT": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6401)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 9H21V15H0V9Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V6H0V0Z" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.208 9L2 15.033H0V0H2L9.2 6H21V9H9.208Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.9 8L0.5 15L0 15.033V0H0.5L8.9 7H21V8H8.9Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 1L8 7.5L0 14V1Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.653 9.347C1.253 8.89 1 8.232 1 7.5C1 6.12 1.895 5 3 5C4.105 5 5 6.12 5 7.5C5 8.88 4.105 10 3 10V9C3.552 9 4 8.328 4 7.5C4 6.672 3.552 6 3 6C2.448 6 2 6.672 2 7.5C2 7.96 2.138 8.37 2.354 8.646L1.654 9.346L1.653 9.347Z" fill="#FFDA2C"/>
</g>
<defs>
<clipPath id="clip0_20468_6401">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "UZB": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6410)">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 11H21V15H0V11Z" fill="#00B731"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V4H0V0Z" fill="#03BCDB"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 5H21V10H0V5ZM5 3.915C4.844 3.97 4.675 4 4.5 4C3.672 4 3 3.328 3 2.5C3 1.672 3.672 1 4.5 1C4.675 1 4.844 1.03 5 1.085C4.417 1.291 4 1.847 4 2.5C4 3.153 4.417 3.71 5 3.915Z" fill="white"/>
<path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M6 2H7V3H6V2ZM7 1H8V2H7V1ZM8 2H9V3H8V2ZM9 1H10V2H9V1ZM10 2H11V3H10V2ZM9 3H10V4H9V3ZM7 3H8V4H7V3Z" fill="#1A47B8"/>
</g>
<defs>
<clipPath id="clip0_20468_6410">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "URY": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 3H21V5H10V3ZM10 7H21V9H10V7ZM0 11H21V13H0V11Z" fill="#3A99FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.88 6.88C6.65 8.125 6.12 9 5.5 9C4.88 9 4.35 8.126 4.12 6.88C2.875 6.65 2 6.12 2 5.5C2 4.88 2.874 4.35 4.12 4.12C4.35 2.875 4.88 2 5.5 2C6.12 2 6.65 2.874 6.88 4.12C8.125 4.35 9 4.88 9 5.5C9 6.12 8.126 6.65 6.88 6.88Z" fill="#D4AF2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.187 6.187C6.123 7.79 5.84 9 5.5 9C5.16 9 4.877 7.79 4.813 6.187C3.21 6.123 2 5.84 2 5.5C2 5.16 3.21 4.877 4.813 4.813C4.877 3.21 5.16 2 5.5 2C5.84 2 6.123 3.21 6.187 4.813C7.79 4.877 9 5.16 9 5.5C9 5.84 7.79 6.123 6.187 6.187V6.187Z" fill="#FFDA2C"/>
<path d="M5.5 7C6.32843 7 7 6.32843 7 5.5C7 4.67157 6.32843 4 5.5 4C4.67157 4 4 4.67157 4 5.5C4 6.32843 4.67157 7 5.5 7Z" fill="#FFDA2C"/>
</svg>
`, "USA": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6420)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H9V7H0V0Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 0V1H21V0H9ZM9 2V3H21V2H9ZM9 4V5H21V4H9ZM9 6V7H21V6H9ZM0 8V9H21V8H0ZM0 10V11H21V10H0ZM0 12V13H21V12H0ZM0 14V15H21V14H0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 1V2H2V1H1ZM3 1V2H4V1H3ZM5 1V2H6V1H5ZM7 1V2H8V1H7ZM6 2V3H7V2H6ZM4 2V3H5V2H4ZM2 2V3H3V2H2ZM1 3V4H2V3H1ZM3 3V4H4V3H3ZM5 3V4H6V3H5ZM7 3V4H8V3H7ZM1 5V6H2V5H1ZM3 5V6H4V5H3ZM5 5V6H6V5H5ZM7 5V6H8V5H7ZM6 4V5H7V4H6ZM4 4V5H5V4H4ZM2 4V5H3V4H2Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_20468_6420">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "TZA": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6479)">
<rect width="21" height="15" rx="3" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 15H21V2L0 13V15Z" fill="#3ECBF8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 14L21 3V-1L0 10V14Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 16L21 5V1L0 12V16Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 15L21 4V0L0 11V15Z" fill="#151515"/>
</g>
<defs>
<clipPath id="clip0_20468_6479">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "GBR": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6424)">
<rect width="21" height="15" rx="3" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.23397 0H0V2.5L18.7539 15L21 15V12.5L2.23397 0Z" fill="white"/>
<path d="M0.745098 0L21 13.5354V15H20.2724L0 1.45056V0H0.745098Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M19 0H21V2.5C21 2.5 8.0098 10.8281 2 15H0V12.5L19 0Z" fill="white"/>
<path d="M21 0H20.3218L0 13.5471V15H0.745098L21 1.46151V0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.63708 0H13.3804V4.62682H21V10.3701H13.3804V15H7.63708V10.3701H0V4.62682H7.63708V0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.8421 0H12.1579V5.76923H21V9.23077H12.1579V15H8.8421V9.23077H0V5.76923H8.8421V0Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_6424">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "ARE": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6431)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V15H6V0H0Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_6431">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "UKR": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V8H0V0Z" fill="#3A99FF"/>
</svg>
`, "UGA": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6438)">
<rect width="21" height="15" rx="3" fill="#FFDA2C"/>
<rect y="12" width="21" height="3" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 7H21V10H0V7Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 4H21V7H0V4Z" fill="#F93939"/>
<path d="M10 10C11.6569 10 13 8.65685 13 7C13 5.34315 11.6569 4 10 4C8.34315 4 7 5.34315 7 7C7 8.65685 8.34315 10 10 10Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 4L9 7L10 9L11 7V10L12 7L11 6L10 7V4Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V2H0V0Z" fill="#151515"/>
</g>
<defs>
<clipPath id="clip0_20468_6438">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "TUV": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#3A99FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 5V6H15V5H14ZM17 5V6H18V5H17ZM12 8V9H13V8H12ZM16 9V10H17V9H16ZM12 11V12H13V11H12ZM8 10V11H9V10H8Z" fill="#FFDA2C"/>
<path d="M9 1H2C1.44772 1 1 1.44772 1 2V7C1 7.55228 1.44772 8 2 8H9C9.55229 8 10 7.55228 10 7V2C10 1.44772 9.55229 1 9 1Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 5H2V4H5V2H6V4H9V5H6V7H5V5ZM7.5 6V7H9V6H7.5ZM7.5 2V3H9V2H7.5ZM2 6V7H3.5V6H2ZM2 2V3H3.5V2H2Z" fill="#F93939"/>
</svg>
`, "TKM": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.236 3.014C11.323 3.004 11.411 3 11.5 3C12.88 3 14 4.12 14 5.5C14 6.88 12.88 8 11.5 8C10.12 8 9 6.88 9 5.5C9 5.41 9.005 5.323 9.014 5.236C9.13 6.23 9.974 7 11 7C12.105 7 13 6.105 13 5C13 3.975 12.23 3.13 11.236 3.014V3.014ZM10 4H11V5H10V4Z" fill="white"/>
<path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M8 4H9V5H8V4ZM10 2H11V3H10V2Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 0H3V15H2V0ZM4 0H5V15H4V0ZM6 0H7V15H6V0Z" fill="#D4AF2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 0L7 1.5L5 3V0ZM5 3L7 4.5L5 6V3ZM5 6L7 7.5L5 9V6ZM5 9L7 10.5L5 12V9ZM5 12L7 13.5L5 15V12ZM4 0L2 1.5L4 3V0ZM4 3L2 4.5L4 6V3ZM4 6L2 7.5L4 9V6ZM4 9L2 10.5L4 12V9ZM4 12L2 13.5L4 15V12ZM4 0H5V2H4V0ZM4 13H5V15H4V13ZM4 5H5V7H4V5ZM4 3H5V4H4V3ZM4 11H5V12H4V11ZM4 8H5V10H4V8Z" fill="#AE6A3E"/>
</svg>
`, "TUR": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.0021 8.65204L12.8401 9.26204L13.0621 7.96904L12.1221 7.05204L13.4221 6.86204L14.0021 5.68604L14.5821 6.86304L15.8821 7.05304L14.9421 7.96804L15.1641 9.26103" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.5 11C11.433 11 13 9.433 13 7.5C13 5.567 11.433 4 9.5 4C7.567 4 6 5.567 6 7.5C6 9.433 7.567 11 9.5 11ZM10.5 10C11.88 10 13 8.88 13 7.5C13 6.12 11.88 5 10.5 5C9.12 5 8 6.12 8 7.5C8 8.88 9.12 10 10.5 10Z" fill="white"/>
</svg>
`, "TUN": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path d="M10.5 11C12.433 11 14 9.433 14 7.5C14 5.567 12.433 4 10.5 4C8.567 4 7 5.567 7 7.5C7 9.433 8.567 11 10.5 11Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 7H13V8H12V7Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 9C12.044 9.607 11.318 10 10.5 10C9.12 10 8 8.88 8 7.5C8 6.12 9.12 5 10.5 5C11.318 5 12.044 5.393 12.5 6H11C10.172 6 9.5 6.672 9.5 7.5C9.5 8.328 10.172 9 11 9H12.5Z" fill="#F93939"/>
</svg>
`, "TTO": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6461)">
<rect width="21" height="15" rx="3" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 0L21 15H14L0 0H7Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 0L20 15H15L1 0H7H6Z" fill="#151515"/>
</g>
<defs>
<clipPath id="clip0_20468_6461">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "TON": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6464)">
<rect width="21" height="15" rx="3" fill="#AF010D"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H11V9H0V0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 4V2H5V4H3V6H5V8H7V6H9V4H7Z" fill="#AF010D"/>
</g>
<defs>
<clipPath id="clip0_20468_6464">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "TGO": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6468)">
<rect width="21" height="15" rx="3" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 0H21V3H7V0ZM7 6H21V9H7V6ZM0 12H21V15H0V12Z" fill="#0A6A30"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H9V9H0V0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.44 5.89705L2.932 6.69005L3.22 5.01005L2 3.82305L3.686 3.57805L4.44 2.05005L5.194 3.57705L6.88 3.82205L5.66 5.01205L5.948 6.69005" fill="white"/>
</g>
<defs>
<clipPath id="clip0_20468_6468">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "TLS": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L14 7.5L0 15V0Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L10 7.5L0 15V0Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.50007 8.75L2.03007 9.523L2.31007 7.886L1.12207 6.726L2.76507 6.489L3.50007 5L4.23507 6.49L5.87807 6.727L4.68807 7.887L4.96807 9.523" fill="white"/>
</svg>
`, "THA": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6476)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V3H0V0ZM0 12H21V15H0V12Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 5H21V10H0V5Z" fill="#232C80"/>
</g>
<defs>
<clipPath id="clip0_20468_6476">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "TJK": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6484)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.97 7.2C11.99 7.297 12 7.397 12 7.5C12 8.328 11.328 9 10.5 9C9.672 9 9 8.328 9 7.5C9 7.397 9.01 7.297 9.03 7.2C9.17 7.656 9.774 8 10.5 8C11.226 8 11.83 7.656 11.97 7.2ZM10.5 7C10.776 7 11 6.776 11 6.5C11 6.224 10.776 6 10.5 6C10.224 6 10 6.224 10 6.5C10 6.776 10.224 7 10.5 7Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#AF010D"/>
</g>
<defs>
<clipPath id="clip0_20468_6484">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "SYR": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6488)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.50007 8.75L5.03007 9.523L5.31007 7.886L4.12207 6.726L5.76507 6.489L6.50007 5L7.23507 6.49L8.87807 6.727L7.68807 7.887L7.96807 9.523L6.50007 8.75ZM14.5001 8.75L13.0301 9.523L13.3101 7.886L12.1221 6.726L13.7651 6.489L14.5001 5L15.2351 6.49L16.8781 6.727L15.6881 7.887L15.9681 9.523" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#AF010D"/>
</g>
<defs>
<clipPath id="clip0_20468_6488">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "CHE": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 6H6V9H9V12H12V9H15V6H12V3H9V6Z" fill="white"/>
</svg>
`, "SWE": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6494)">
<rect width="21" height="15" rx="3" fill="#3A99FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 9H0V6H6V0H9V6H21V9H9V15H6V9Z" fill="#FFDA2C"/>
</g>
<defs>
<clipPath id="clip0_20468_6494">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "SWZ": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7012)">
<rect width="21" height="15" rx="3" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 12H21V15H0V12ZM0 0H21V3H0V0Z" fill="#4769C1"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 4H21V11H0V4Z" fill="#BC0A33"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 8H17V9H4V8ZM6 6H16V7H6V6Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 6H18V7H16V6Z" fill="#CBCBCB"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 10C12.985 10 15 7.5 15 7.5C15 7.5 12.985 5 10.5 5C8.015 5 6 7.5 6 7.5C6 7.5 8.015 10 10.5 10Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 7H14V8H13V7Z" fill="#151515" stroke="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 10C11 10 12 7.5 12 7.5C12 7.5 11 5 10.5 5C8.015 5 6 7.5 6 7.5C6 7.5 8.015 10 10.5 10Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 7H9V8H8V7ZM10 7H11V8H10V7Z" fill="#CBCBCB"/>
</g>
<defs>
<clipPath id="clip0_20468_7012">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "SUR": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6496)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 11H21V15H0V11ZM0 0H21V4H0V0Z" fill="#0A6A30"/>
<path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M0 11H21V15H0V11ZM0 0H21V4H0V0Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 5H21V10H0V5Z" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5001 8.75L9.03007 9.523L9.31007 7.886L8.12207 6.726L9.76507 6.489L10.5001 5L11.2351 6.49L12.8781 6.727L11.6881 7.887L11.9681 9.523" fill="#FFDA2C"/>
</g>
<defs>
<clipPath id="clip0_20468_6496">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "SDN": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6501)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V15.033L10 7.5L0 0Z" fill="#249F58"/>
</g>
<defs>
<clipPath id="clip0_20468_6501">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "PSE": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6674)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V15.033L10 7.5L0 0Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_6674">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "LKA": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6505)">
<rect width="21" height="15" rx="3" fill="#FFDA2C"/>
<rect width="21" height="15" fill="#FFDA2C"/>
<rect opacity="0.3" width="21" height="15" fill="#FF6C2D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 2H19V13H9V2ZM12.535 10.616L12.593 10.572L12.617 10.616C12.65 10.676 12.741 10.674 12.801 10.616L12.848 10.569L12.888 10.614C12.938 10.674 13.032 10.674 13.092 10.614C13.136 10.572 13.142 10.571 13.17 10.604C13.186 10.622 13.235 10.644 13.278 10.651C13.356 10.665 13.358 10.664 13.403 10.573C13.443 10.497 13.448 10.467 13.439 10.393C13.433 10.343 13.426 10.265 13.424 10.218C13.422 10.132 13.422 10.131 13.516 10.088C13.566 10.064 13.626 10.032 13.649 10.016C13.686 9.99002 13.789 9.82902 13.789 9.79602C13.789 9.78802 13.749 9.77602 13.699 9.76802C13.504 9.73802 13.471 9.59802 13.599 9.33802C13.806 8.91602 13.931 8.50302 13.932 8.24002C13.932 8.12302 13.937 8.08302 13.949 8.11002C13.995 8.21302 13.912 8.65002 13.786 8.96502L13.736 9.09202L13.784 9.07702C13.81 9.06702 13.967 8.98002 14.131 8.88102C14.581 8.61102 14.736 8.55702 15.028 8.57302C15.272 8.58702 15.376 8.65002 15.548 8.89102C15.64 9.01802 15.728 9.10902 15.888 9.24302C16.232 9.52902 16.246 9.55302 16.262 9.88902C16.279 10.229 16.272 10.249 16.077 10.305C15.912 10.353 15.807 10.455 15.78 10.598C15.766 10.675 15.797 10.678 15.88 10.606L15.94 10.554L15.968 10.606C16.004 10.676 16.08 10.676 16.143 10.606L16.19 10.556L16.238 10.606C16.314 10.686 16.415 10.668 16.443 10.566C16.448 10.548 16.463 10.554 16.493 10.588C16.548 10.652 16.689 10.68 16.705 10.628C16.711 10.61 16.699 10.563 16.68 10.524C16.598 10.36 16.572 10.281 16.57 10.192C16.57 10.068 16.597 10.008 16.704 9.90602C16.834 9.78302 16.874 9.62602 16.776 9.62602C16.716 9.62602 16.654 9.55302 16.616 9.43602C16.536 9.20102 16.551 8.93602 16.67 8.49602C16.79 8.04602 16.804 7.96602 16.805 7.66602C16.805 7.42302 16.802 7.38102 16.76 7.24802C16.735 7.16802 16.683 7.04602 16.646 6.98002L16.579 6.86002L16.666 6.76202C16.933 6.46802 16.879 5.98602 16.556 5.80202C16.459 5.74402 16.434 5.73902 16.262 5.74202C16.158 5.74202 16.002 5.76002 15.912 5.78202C15.82 5.80202 15.666 5.82002 15.56 5.82002C15.392 5.82002 15.364 5.81602 15.3 5.77002C15.232 5.72202 15.22 5.70002 15.207 5.59002C15.205 5.56602 15.193 5.54402 15.181 5.54002C15.158 5.53002 15.051 5.65002 15.037 5.70602C15.029 5.73202 15.022 5.73002 15 5.69602C14.985 5.67102 14.964 5.61602 14.953 5.57402C14.926 5.46602 14.959 5.38402 15.053 5.32402L15.128 5.27802L15.086 5.24202C14.996 5.16802 14.843 5.21802 14.788 5.34202C14.772 5.37502 14.755 5.40402 14.75 5.40402C14.745 5.40402 14.715 5.37102 14.684 5.33102C14.568 5.18102 14.608 4.95702 14.764 4.88802C14.846 4.85202 14.919 4.88002 14.934 4.95302C14.957 5.06502 15.03 4.91802 15.017 4.78502C15.007 4.69702 15.007 4.69302 15.054 4.69302C15.118 4.69302 15.254 4.80502 15.297 4.89302C15.347 4.99302 15.342 5.15302 15.287 5.27102L15.247 5.36402L15.301 5.35002C15.381 5.32802 15.461 5.26002 15.501 5.18002C15.543 5.09402 15.548 4.92702 15.511 4.83602C15.474 4.74902 15.478 4.73602 15.531 4.76602C15.623 4.81602 15.671 4.87002 15.708 4.96602C15.742 5.05102 15.744 5.07202 15.726 5.16102C15.716 5.21602 15.691 5.28802 15.672 5.32102C15.642 5.37402 15.642 5.38302 15.665 5.38302C15.708 5.38302 15.8 5.32802 15.832 5.28302C15.848 5.25902 15.872 5.20302 15.885 5.15502L15.908 5.07102L15.935 5.13502C15.973 5.22502 16.045 5.30802 16.135 5.35902C16.232 5.41502 16.272 5.41902 16.222 5.36702C16.188 5.33202 16.125 5.08702 16.144 5.06402C16.154 5.05002 16.286 5.18402 16.434 5.36202C16.576 5.53202 16.664 5.58602 16.794 5.58602C16.961 5.58602 17.057 5.39402 16.984 5.21302C16.939 5.10702 16.842 5.09302 16.786 5.18302C16.76 5.22502 16.753 5.25802 16.76 5.30102C16.77 5.35502 16.766 5.36102 16.73 5.36102C16.68 5.36102 16.586 5.28102 16.418 5.09302C16.161 4.80802 15.848 4.56602 15.623 4.47802C15.478 4.42002 15.169 4.39802 15.023 4.43402C14.863 4.47202 14.673 4.59402 14.571 4.72402C14.389 4.95402 14.387 5.25902 14.564 5.53802L14.614 5.61802L14.58 5.68802C14.53 5.79202 14.534 5.93102 14.59 6.03302C14.615 6.07802 14.64 6.11502 14.646 6.11502C14.652 6.11502 14.658 6.08502 14.66 6.05002C14.665 5.96002 14.694 5.90002 14.744 5.87702C14.788 5.85502 14.817 5.86502 15.022 5.97302C15.237 6.08802 15.59 6.09502 15.966 5.99302C16.151 5.94502 16.368 5.94802 16.464 6.00102C16.639 6.09902 16.68 6.35302 16.551 6.54602C16.495 6.62802 16.441 6.66202 16.261 6.72802C16.123 6.77802 16.091 6.78202 15.778 6.77802C15.511 6.77402 15.415 6.78102 15.306 6.81102C15.188 6.84402 15.116 6.84702 14.768 6.83602L14.366 6.82202L14.411 6.87202C14.435 6.89802 14.471 6.93202 14.488 6.94502C14.518 6.96702 14.518 6.97002 14.472 6.99202C14.445 7.00602 14.387 7.01602 14.342 7.01602H14.259L14.249 7.11002C14.243 7.16202 14.243 7.22002 14.249 7.24302C14.259 7.27602 14.256 7.28002 14.229 7.26802C14.213 7.25802 14.165 7.24302 14.123 7.23102C14.081 7.21902 14.025 7.19602 13.998 7.17802C13.952 7.14802 13.948 7.14802 13.93 7.18802C13.916 7.22402 13.776 7.36202 13.755 7.36202C13.752 7.36202 13.748 7.33502 13.745 7.30202C13.745 7.27002 13.725 7.18502 13.701 7.11402C13.679 7.04402 13.655 6.96602 13.649 6.94202C13.639 6.90602 13.636 6.90402 13.624 6.93202C13.617 6.94902 13.606 6.99702 13.6 7.03902C13.595 7.07902 13.574 7.14902 13.554 7.18902L13.518 7.26302L13.495 7.19902C13.471 7.13102 13.43 7.05902 13.415 7.05902C13.41 7.05902 13.401 7.08202 13.395 7.10902C13.385 7.16402 13.288 7.31902 13.265 7.31902C13.255 7.31902 13.248 7.27502 13.248 7.22202C13.248 7.16802 13.241 7.12502 13.231 7.12502C13.223 7.12502 13.215 7.13802 13.215 7.15502C13.215 7.19502 13.132 7.31802 13.105 7.31802C13.092 7.31802 13.073 7.33202 13.061 7.35002C13.031 7.39602 13.006 7.39002 13.018 7.34002C13.025 7.31502 13.021 7.26002 13.01 7.21502L12.983 7.11002C12.979 7.09402 12.95 7.09802 12.887 7.12502C12.785 7.16802 12.751 7.16102 12.803 7.10502C12.823 7.08502 12.853 7.01702 12.868 6.95302C12.884 6.88902 12.908 6.83302 12.922 6.82602C12.94 6.82002 12.939 6.82902 12.917 6.86802C12.902 6.89602 12.889 6.93402 12.889 6.95202C12.889 6.97002 12.876 7.01202 12.862 7.04702C12.848 7.08302 12.839 7.11402 12.842 7.11702C12.846 7.12202 12.884 7.10302 12.928 7.07502L13.008 7.02502V7.07002C13.008 7.09502 13.018 7.16002 13.028 7.21602L13.05 7.31602L13.104 7.28302C13.159 7.24902 13.212 7.12802 13.212 7.03502C13.212 6.98702 13.232 6.99502 13.24 7.04502L13.268 7.16502L13.292 7.25902L13.329 7.19902C13.349 7.16602 13.376 7.10202 13.387 7.05602C13.407 6.97802 13.435 6.94402 13.435 7.00102C13.435 7.04302 13.521 7.19102 13.537 7.17902C13.545 7.17302 13.561 7.11702 13.572 7.05502C13.596 6.92502 13.634 6.83702 13.659 6.85502C13.669 6.86302 13.671 6.87502 13.666 6.88502C13.662 6.89502 13.681 6.98002 13.71 7.07302C13.74 7.16602 13.77 7.26002 13.775 7.28102C13.785 7.31602 13.795 7.31102 13.857 7.23802C13.897 7.19302 13.931 7.14302 13.935 7.12602C13.941 7.10202 13.95 7.10302 13.985 7.13202C14.035 7.17402 14.205 7.24202 14.218 7.22402C14.223 7.21802 14.228 7.15902 14.228 7.09402L14.231 6.97402L14.281 6.98702C14.308 6.99502 14.364 6.99402 14.406 6.98702L14.482 6.97202L14.415 6.91002C14.378 6.87602 14.34 6.83202 14.331 6.81202C14.321 6.79202 14.287 6.77202 14.251 6.76902C14.148 6.75702 13.967 6.62202 13.967 6.55902C13.967 6.54602 13.992 6.56602 14.023 6.60402C14.091 6.68602 14.185 6.73802 14.267 6.73802H14.329L14.291 6.67202C14.269 6.63202 14.249 6.56002 14.244 6.49902C14.237 6.40402 14.229 6.38902 14.154 6.31902C14.109 6.27702 14.052 6.21402 14.029 6.17902L13.987 6.11602L13.965 6.19102C13.953 6.23302 13.938 6.26602 13.933 6.26602C13.927 6.26602 13.903 6.24202 13.883 6.21302C13.86 6.18302 13.837 6.15902 13.833 6.15902C13.826 6.15902 13.807 6.19902 13.788 6.24902L13.755 6.33602L13.729 6.28602C13.714 6.25602 13.681 6.20802 13.654 6.17602C13.627 6.14202 13.612 6.11602 13.622 6.11602C13.632 6.11602 13.666 6.15002 13.697 6.19102L13.754 6.26702L13.777 6.21102C13.79 6.17902 13.795 6.12802 13.789 6.08702C13.779 6.02702 13.781 6.02502 13.799 6.06202C13.809 6.08602 13.842 6.13202 13.872 6.16202L13.926 6.22202L13.963 6.13202C14 6.04202 14.001 6.04202 14.017 6.09402C14.04 6.16602 14.202 6.34402 14.34 6.44602C14.36 6.46202 14.352 6.40602 14.313 6.28102C14.303 6.24802 14.293 6.18802 14.293 6.14802C14.293 6.08802 14.281 6.06102 14.223 6.00302C14.141 5.91902 14.115 5.86002 14.099 5.72502C14.093 5.67002 14.079 5.60902 14.067 5.59002C14.05 5.56002 14.047 5.57702 14.052 5.67802C14.054 5.74802 14.047 5.83202 14.036 5.86802L14.016 5.93202L14 5.87802C13.99 5.84802 13.953 5.79802 13.915 5.76302C13.875 5.73002 13.85 5.69702 13.855 5.69002C13.86 5.68402 13.9 5.71402 13.942 5.75802C14.007 5.82502 14.022 5.83202 14.03 5.80302C14.04 5.76802 14.03 5.61702 14.01 5.51302C14 5.45902 14 5.45902 14.05 5.52302C14.086 5.57302 14.105 5.62902 14.12 5.72902C14.14 5.85602 14.15 5.87902 14.238 5.97902C14.291 6.04202 14.338 6.08902 14.34 6.08502C14.344 6.08102 14.35 5.92102 14.355 5.73002C14.365 5.36502 14.355 5.27802 14.288 5.16502L14.254 5.10702L14.307 5.03002C14.377 4.93002 14.409 4.85002 14.423 4.74002L14.435 4.65002L14.375 4.72702C14.325 4.78902 14.302 4.80302 14.245 4.80302C14.188 4.80302 14.165 4.79102 14.128 4.73602C14.082 4.67102 14 4.60902 13.922 4.57802C13.892 4.56802 13.882 4.57202 13.882 4.59802C13.882 4.61802 13.867 4.67202 13.847 4.72002L13.812 4.80802L13.738 4.71002C13.692 4.65002 13.638 4.60402 13.598 4.59002C13.495 4.55402 13.49 4.55702 13.49 4.66002C13.49 4.81302 13.44 4.84202 13.35 4.74002C13.283 4.66002 13.226 4.64402 13.097 4.66302L12.997 4.67802L13.017 4.73802C13.031 4.78802 13.027 4.80802 12.995 4.86502C12.943 4.95702 12.875 4.99702 12.771 4.99702C12.723 4.99702 12.663 5.01002 12.637 5.02702C12.612 5.04202 12.549 5.06102 12.497 5.06702C12.445 5.07402 12.39 5.08702 12.374 5.09402C12.35 5.10602 12.347 5.09602 12.354 5.02202C12.367 4.90802 12.308 4.82502 12.214 4.82502C12.094 4.82502 12.039 4.96802 12.086 5.15702C12.0949 5.18897 12.1038 5.23823 12.1098 5.27198L12.112 5.28402C12.119 5.31902 12.172 5.41202 12.24 5.50102C12.304 5.58702 12.364 5.67602 12.374 5.69902C12.384 5.72202 12.417 5.75902 12.447 5.78102L12.502 5.82102L12.495 5.74402C12.487 5.65802 12.501 5.64402 12.535 5.70402C12.548 5.72702 12.579 5.76202 12.605 5.78402C12.645 5.81602 12.652 5.81702 12.652 5.78802C12.652 5.76802 12.66 5.72802 12.67 5.69402L12.69 5.63402L12.72 5.71602C12.738 5.76102 12.796 5.86402 12.848 5.94602C12.95 6.10102 13.012 6.27602 12.98 6.31602C12.967 6.33302 12.932 6.33102 12.86 6.31202C12.803 6.29802 12.733 6.29002 12.704 6.29502C12.644 6.30502 12.641 6.29502 12.677 6.23502C12.715 6.17202 12.709 6.16202 12.634 6.16202C12.547 6.16202 12.332 6.10602 12.249 6.06202C12.169 6.02202 12.149 6.03202 12.126 6.13202L12.083 6.31702L12.06 6.41702L12.147 6.40702C12.195 6.40002 12.257 6.38702 12.284 6.37502C12.312 6.36502 12.337 6.35902 12.34 6.36202C12.343 6.36602 12.33 6.40602 12.313 6.45002L12.279 6.53002L12.334 6.51602C12.364 6.50802 12.409 6.48802 12.434 6.47202C12.478 6.44402 12.481 6.44602 12.516 6.51902C12.558 6.60902 12.592 6.60602 12.599 6.50902C12.607 6.41102 12.632 6.42602 12.679 6.55702C12.722 6.68302 12.769 6.72702 12.777 6.65302C12.78 6.62902 12.803 6.58802 12.83 6.56302C12.883 6.51302 12.923 6.52902 12.945 6.60702C12.97 6.68702 12.917 6.77102 12.765 6.89502C12.455 7.14302 12.277 7.48302 12.225 7.91502C12.179 8.30502 12.323 8.70902 12.612 8.99902C12.75 9.13902 12.97 9.28402 12.956 9.22902C12.898 8.99102 12.9 8.53902 12.96 8.46202C12.97 8.45002 12.966 8.49702 12.953 8.56602C12.905 8.82402 12.926 9.02902 13.05 9.51002C13.16 9.94602 13.146 10.132 12.988 10.254C12.938 10.294 12.904 10.3 12.768 10.298C12.62 10.296 12.604 10.3 12.556 10.35C12.51 10.4 12.451 10.56 12.451 10.634C12.451 10.674 12.484 10.669 12.551 10.618L12.535 10.616ZM11.415 9.81602C11.431 9.78902 11.443 9.74602 11.443 9.72102C11.443 9.68302 11.456 9.67302 11.52 9.66102L11.597 9.64702L11.547 9.59202C11.485 9.52802 11.479 9.47802 11.533 9.47802C11.586 9.47802 11.677 9.40402 11.691 9.34802C11.698 9.32402 11.694 9.29002 11.683 9.27202C11.653 9.22702 11.596 9.23402 11.586 9.28402C11.574 9.33802 11.556 9.33902 11.513 9.28402C11.449 9.20402 11.447 9.03602 11.51 8.93802C11.538 8.89202 11.538 8.88802 11.5 8.84202C11.46 8.79002 11.43 8.68902 11.45 8.66502C11.456 8.65802 11.488 8.66502 11.52 8.67902C11.568 8.69902 11.587 8.70102 11.606 8.67902C11.666 8.61902 11.601 8.53902 11.506 8.55702C11.469 8.56402 11.454 8.55702 11.448 8.53102C11.444 8.51102 11.411 8.48402 11.373 8.47102C11.307 8.44902 11.306 8.45102 11.306 8.51102C11.306 8.57802 11.276 8.59102 11.223 8.54802C11.178 8.51302 11.135 8.54002 11.135 8.60302C11.135 8.66102 11.18 8.69002 11.259 8.68302C11.319 8.67802 11.322 8.73902 11.264 8.82502L11.222 8.88802L11.255 8.95102C11.305 9.04402 11.3 9.19902 11.245 9.27602L11.205 9.33602L11.177 9.28802C11.139 9.22102 11.087 9.22602 11.072 9.29802C11.062 9.34502 11.072 9.36602 11.115 9.41602C11.145 9.44902 11.188 9.47602 11.211 9.47602C11.269 9.47602 11.267 9.53602 11.207 9.59802L11.16 9.64602L11.234 9.66102C11.274 9.66902 11.306 9.68502 11.306 9.69602C11.306 9.73602 11.356 9.86402 11.373 9.86402C11.383 9.86402 11.403 9.84402 11.416 9.81702L11.415 9.81602ZM11.668 7.64602C11.834 7.54902 11.848 7.30202 11.692 7.23602C11.627 7.21002 11.586 7.22602 11.562 7.28302C11.542 7.32802 11.555 7.40902 11.582 7.40902C11.59 7.40902 11.597 7.42302 11.597 7.44102C11.597 7.52702 11.344 7.56602 11.241 7.49602C11.205 7.47102 11.191 7.40802 11.221 7.40802C11.241 7.40802 11.258 7.34202 11.247 7.29602C11.231 7.23402 11.183 7.21202 11.115 7.23602C10.96 7.29002 10.965 7.53202 11.122 7.63602C11.252 7.71902 11.536 7.72402 11.67 7.64602H11.668ZM11.565 7.45602C11.575 7.44602 11.571 7.42602 11.555 7.40902C11.52 7.37202 11.522 7.31702 11.56 7.25402C11.59 7.20702 11.593 7.13702 11.603 6.42802C11.62 5.20402 11.688 4.28502 11.778 4.06502C11.814 3.97702 11.808 3.97502 11.716 4.06002C11.596 4.16802 11.506 4.31002 11.426 4.51002C11.274 4.89002 11.221 5.40202 11.221 6.49402C11.221 7.11402 11.225 7.19402 11.251 7.25402C11.277 7.30802 11.278 7.32902 11.261 7.38802C11.249 7.42602 11.244 7.46302 11.249 7.46802C11.283 7.51202 11.529 7.50102 11.566 7.45502L11.565 7.45602ZM11 3H10V4H11V3ZM18 3H17V4H18V3ZM11 11H10V12H11V11ZM18 11H17V12H18V11Z" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 2H8V13H5V2Z" fill="#FF6C2D"/>
<path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M5 2H8V13H5V2Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 2H5V13H2V2Z" fill="#0A6A30"/>
</g>
<defs>
<clipPath id="clip0_20468_6505">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "ESP": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6512)">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 4H21V11H0V4Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 6.22204V8.74204C9 9.44204 8.328 10.002 7.5 10.002H5.5C4.674 10 4 9.43704 4 8.74004V6.22004C4 5.64804 4.448 5.17004 5.064 5.01504C5.25 4.49504 5.822 4.96104 6.5 4.96104C7.182 4.96104 7.75 4.49804 7.936 5.01604C8.55 5.17504 9 5.65404 9 6.22204Z" fill="#D4AF2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 7H10V10H9V7ZM3 7H4V10H3V7Z" fill="#CBCBCB"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 9H10V10H9V9ZM3 9H4V10H3V9Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 6H10V7H9V6ZM3 6H4V7H3V6Z" fill="#D4AF2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 6H6V7.5H5V6ZM7 8H8V9.5H7V8Z" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 8H6V9.5H5V8Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 6H8V7.5H7V6Z" fill="#AE6A3E"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 6L5 5H8L7 6H6Z" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 4H7V5H6V4Z" fill="#D4AF2C"/>
</g>
<defs>
<clipPath id="clip0_20468_6512">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "SSD": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6524)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 11H21V15H0V11Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 5H21V10H0V5Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V4H0V0Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L12 7.5L0 15V0Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.73336 8.73183L3.40336 9.72483L3.42336 8.06483L2.06836 7.10483L3.65336 6.61283L4.14636 5.02783L5.10636 6.38283L6.76636 6.36283L5.77236 7.69283L6.30536 9.26483L4.73336 8.73183V8.73183Z" fill="#FFDA2C"/>
</g>
<defs>
<clipPath id="clip0_20468_6524">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "ZAF": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6534)">
<rect width="21" height="15" rx="3" fill="white"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.013 10L2 15.033H0V0H2L8 5H21V10H8.013Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.7 9L0.5 15L0 15.033V0H0.5L7.7 6H21V9H7.7Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 3L6 7.5L0 12V3Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 4L4.75 7.5L0 11V4Z" fill="#151515"/>
</g>
<defs>
<clipPath id="clip0_20468_6534">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "SOM": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#3A99FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5021 9.33L8.41207 10.43L8.81207 8.103L7.12207 6.456L9.45807 6.116L10.5021 4L11.5471 6.116L13.8821 6.456L12.1921 8.103L12.5921 10.429" fill="white"/>
</svg>
`, "SLB": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6545)">
<rect width="21" height="15" rx="3" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 15H21V0L0 15Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 15H21V2L2 15Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.12207 5.658L4.50407 6L4.62207 5.276L4.12207 4.764L4.81207 4.658L5.12207 4L5.43207 4.658L6.12207 4.764L5.62207 5.276L5.74007 6L5.12207 5.658ZM3.12207 3.658L2.50407 4L2.62207 3.276L2.12207 2.764L2.81207 2.658L3.12207 2L3.43207 2.658L4.12207 2.764L3.62207 3.276L3.74007 4L3.12207 3.658V3.658ZM7.12207 3.658L6.50407 4L6.62207 3.276L6.12207 2.764L6.81207 2.658L7.12207 2L7.43207 2.658L8.12207 2.764L7.62207 3.276L7.74007 4L7.12207 3.658V3.658ZM7.12207 7.658L6.50407 8L6.62207 7.276L6.12207 6.764L6.81207 6.658L7.12207 6L7.43207 6.658L8.12207 6.764L7.62207 7.276L7.74007 8L7.12207 7.658ZM3.12207 7.658L2.50407 8L2.62207 7.276L2.12207 6.764L2.81207 6.658L3.12207 6L3.43207 6.658L4.12207 6.764L3.62207 7.276L3.74007 8L3.12207 7.658V7.658Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_20468_6545">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "SVN": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6549)">
<rect width="21" height="15" rx="3" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="white"/>
<path d="M6.5 3H4.5C3.94772 3 3.5 3.44772 3.5 4V6.5C3.5 7.05228 3.94772 7.5 4.5 7.5H6.5C7.05228 7.5 7.5 7.05228 7.5 6.5V4C7.5 3.44772 7.05228 3 6.5 3Z" fill="#F93939"/>
<path d="M6 3H5C4.44772 3 4 3.44772 4 4V6C4 6.55228 4.44772 7 5 7H6C6.55228 7 7 6.55228 7 6V4C7 3.44772 6.55228 3 6 3Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 6L5.5 5.5L7 6L6 7H5L4 6Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 4H6V5H5V4Z" fill="#FFDA2C"/>
</g>
<defs>
<clipPath id="clip0_20468_6549">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "SVK": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6556)">
<rect width="21" height="15" rx="3" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0ZM9.93 10H10V5H3V10H3.07C3.024 10.162 3 10.33 3 10.5C3 11.88 6.5 13 6.5 13C6.5 13 10 11.88 10 10.5C10 10.33 9.976 10.162 9.93 10Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 10V4H4V10C4 11.105 6.5 12 6.5 12C6.5 12 9 11.105 9 10Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 8V7H5V6H6V5H7V6H8V7H7V8H8.5V9H7V10H6V9H4.5V8H6Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 12.0001C6.5 12.0001 9 11.1051 9 10.0001C9 8.89507 8 9.00007 6.5 10.0001C5 9.00007 4 8.89507 4 10.0001C4 11.1051 6.5 12.0001 6.5 12.0001Z" fill="#1A47B8"/>
</g>
<defs>
<clipPath id="clip0_20468_6556">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "SXM": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6562)">
<rect width="21" height="15" rx="3" fill="#1A47B8"/>
<path d="M21 0H0V7H21V0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L10 7.5L0 15V0Z" fill="white"/>
<path d="M4 10C4.55228 10 5 9.10457 5 8C5 6.89543 4.55228 6 4 6C3.44772 6 3 6.89543 3 8C3 9.10457 3.44772 10 4 10Z" fill="#3ECBF8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 7V9H4H5V7L6 9L5 10H3L2 9L3 7Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 5H3L4 6L5 5H7L5 6H3L1 5Z" fill="#AE6A3E"/>
</g>
<defs>
<clipPath id="clip0_20468_6562">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "SGP": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V9H0V0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 7.863C5.71 7.953 5.4 8 5.077 8C3.377 8 2 6.657 2 5C2 3.343 3.378 2 5.077 2C5.399 2 5.709 2.048 6 2.137C4.752 2.52 3.846 3.657 3.846 5C3.846 6.343 4.752 7.48 6 7.863ZM8 3H9V4H8V3ZM10 4H11V5H10V4ZM9 6H10V7H9V6ZM6 4H7V5H6V4ZM7 6H8V7H7V6Z" fill="white"/>
</svg>
`, "SLE": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6571)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#3A99FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#00B731"/>
</g>
<defs>
<clipPath id="clip0_20468_6571">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "SYC": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6574)">
<rect width="21" height="15" rx="3" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 15L9 0H0V15Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 15L16 0H21V4L0 15Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 15L21 9V4L0 15Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 15L21 9V15H0Z" fill="#249F58"/>
</g>
<defs>
<clipPath id="clip0_20468_6574">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "SRB": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6579)">
<rect width="21" height="15" rx="3" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0ZM8 10V5H4V10C4 11.105 4.895 12 6 12C7.105 12 8 11.105 8 10Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 6L4 7L6 8L5 10L6 12L7 10L6 8L8 7L7 6L6 7L5 6Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 8L4 9H8L6 8Z" fill="#88605F"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 6H4V7L5 6ZM7 6H8V7L7 6Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 5L4 4C4 4 5 3 6 3C7 3 8 4 8 4L7 5H5Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 3L5 4L6 5L7 4L6 3Z" fill="#A75835"/>
</g>
<defs>
<clipPath id="clip0_20468_6579">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "SEN": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6587)">
<rect width="21" height="15" rx="3" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5001 8.75L9.03007 9.523L9.31007 7.886L8.12207 6.726L9.76507 6.489L10.5001 5L11.2351 6.49L12.8781 6.727L11.6881 7.887L11.9681 9.523" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 0H21V15H14V0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H7V15H0V0Z" fill="#249F58"/>
</g>
<defs>
<clipPath id="clip0_20468_6587">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "SAU": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.9999 10V9.00001H4.99986L6.99986 10H12.9999C12.9999 10.552 13.6719 11 14.4999 11C15.3279 11 15.9999 10.552 15.9999 10ZM8.72986 3.90601C8.71786 3.90601 8.69986 3.91201 8.67686 3.92601C8.62286 3.96201 8.51686 4.07301 8.51286 4.20101C8.50986 4.27401 8.49586 4.27401 8.54286 4.32101C8.57686 4.36901 8.61286 4.36501 8.68086 4.32801C8.72086 4.29801 8.73386 4.28101 8.74786 4.23201C8.76386 4.15201 8.66086 4.27201 8.64786 4.18001C8.62486 4.09601 8.69086 4.06001 8.75286 3.98001C8.75486 3.94001 8.75486 3.91001 8.72986 3.90801V3.90601ZM9.73286 3.91101C9.71286 3.91501 9.68986 3.94101 9.65686 3.99901C9.63386 4.06101 9.53286 4.15501 9.60686 4.34901C9.66486 4.47201 9.68986 4.67101 9.66286 4.89401C9.62086 4.95701 9.61286 4.97901 9.55786 5.04201C9.48186 5.12501 9.39786 5.10401 9.33586 5.07201C9.27586 5.03201 9.22986 5.01201 9.20286 4.88601C9.20786 4.68601 9.21986 4.35401 9.18286 4.28401C9.12886 4.17601 9.03886 4.21401 9.00086 4.24701C8.81786 4.41701 8.72686 4.70001 8.67086 4.92701C8.62086 5.09101 8.56586 5.04301 8.52786 4.97701C8.43486 4.88901 8.42786 4.20701 8.31586 4.32001C8.13586 4.83401 8.41886 5.39701 8.61586 5.34201C8.75586 5.40201 8.84586 5.13201 8.90386 4.83701C8.94386 4.75401 8.97386 4.74401 8.99386 4.78701C8.98886 5.17901 9.02386 5.26701 9.12386 5.38501C9.34786 5.55901 9.53386 5.40701 9.54886 5.39301L9.72386 5.21901C9.76386 5.17901 9.81386 5.17501 9.86886 5.21101C9.92286 5.26101 9.91586 5.34401 10.0289 5.40101C10.1269 5.44101 10.3319 5.41101 10.3789 5.32801C10.4439 5.21801 10.4589 5.18001 10.4889 5.13801C10.5349 5.07801 10.6139 5.10501 10.6139 5.12401C10.6069 5.15901 10.5609 5.19401 10.5919 5.25401C10.6469 5.29401 10.6599 5.26801 10.6919 5.25901C10.8059 5.20501 10.8919 4.95701 10.8919 4.95701C10.8969 4.86501 10.8449 4.87201 10.8119 4.89101C10.7669 4.91801 10.7649 4.92701 10.7219 4.95401C10.6649 4.96201 10.5569 4.99901 10.5039 4.91601C10.4489 4.81601 10.4489 4.67801 10.4069 4.57601C10.4069 4.57001 10.3339 4.41901 10.4009 4.41001C10.4339 4.41601 10.5079 4.43501 10.5189 4.37401C10.5549 4.31401 10.4419 4.14401 10.3649 4.06001C10.2989 3.98701 10.2069 3.97801 10.1179 4.05201C10.0549 4.11001 10.0649 4.17401 10.0519 4.23501C10.0369 4.30501 10.0399 4.39201 10.1119 4.48501C10.1739 4.60701 10.2869 4.76501 10.2489 4.98701C10.2489 4.98701 10.1839 5.09301 10.0689 5.07901C10.0189 5.06901 9.94086 5.04901 9.89886 4.73901C9.86886 4.50601 9.90686 4.17901 9.80886 4.02601C9.78586 3.96901 9.76686 3.91301 9.73486 3.91601L9.73286 3.91101ZM9.41486 3.93701C9.38486 3.94001 9.35186 3.97501 9.32486 4.04201C9.30186 4.09401 9.27286 4.36201 9.27786 4.36201C9.25786 4.44201 9.36086 4.47601 9.40786 4.37401C9.47786 4.18401 9.47786 4.10401 9.48186 4.02601C9.47186 3.96601 9.44486 3.93601 9.41486 3.93801V3.93701ZM10.5879 3.95701C10.5579 3.96101 10.5329 3.97901 10.5239 4.02501C10.5109 4.13101 10.5179 4.19001 10.5359 4.27901C10.5489 4.33901 10.6359 4.43701 10.6779 4.49501C10.8809 4.76801 11.0779 5.04201 11.2659 5.32501C11.2959 5.53701 11.3159 5.74301 11.3309 5.94901C11.3629 6.39901 11.3709 6.95901 11.3439 7.43401C11.4279 7.43701 11.5639 7.29701 11.6109 7.09401C11.6409 6.81001 11.6009 6.23401 11.5969 6.06601L11.5869 5.82801C11.8069 6.18801 12.0189 6.56801 12.2269 6.98401C12.3039 6.94801 12.2869 6.51901 12.2429 6.45901C12.0749 6.09901 11.8429 5.74301 11.7699 5.60601C11.7429 5.55601 11.6519 5.41901 11.5449 5.26001C11.5249 5.03201 11.5029 4.84001 11.4889 4.78201C11.4539 4.54201 11.5869 4.80901 11.5689 4.67001C11.5249 4.43001 11.3929 4.26801 11.2369 4.04801C11.1869 3.97801 11.1869 3.96201 11.1099 4.06601C11.0649 4.17101 11.0649 4.25901 11.0799 4.34101C11.0579 4.31101 11.0329 4.27701 10.9969 4.23301L10.7419 4.01701C10.7069 3.99201 10.6389 3.95401 10.5879 3.95701V3.95701ZM14.0639 3.99401C14.0489 3.99201 14.0339 3.99901 14.0139 4.02601C13.9789 4.05601 13.9419 4.11301 13.9439 4.18601C13.9509 4.31101 13.9739 4.44001 13.9819 4.56601L13.9919 4.61601C13.9779 4.60001 13.9659 4.58601 13.9589 4.58001C13.7119 4.32001 14.0719 4.53601 13.9109 4.33701C13.7759 4.18701 13.7359 4.14101 13.6209 4.05101C13.5609 4.01501 13.5269 3.94301 13.5079 4.06501C13.4999 4.17201 13.4919 4.29701 13.4979 4.38701C13.4979 4.43701 13.5509 4.53201 13.5959 4.58701C13.7599 4.79001 13.9279 5.00501 14.0959 5.22901C14.1319 5.68601 14.1409 6.10501 14.1759 6.56301C14.1719 6.75901 14.1119 7.01901 14.0559 7.04301C14.0559 7.04301 13.9679 7.09301 13.9099 7.03801C13.8669 7.02101 13.6979 6.75501 13.6979 6.75501C13.6109 6.67501 13.5529 6.69801 13.4919 6.75501C13.3219 6.91901 13.2439 7.22701 13.1289 7.43901C13.0989 7.48601 13.0159 7.52701 12.9229 7.43501C12.6859 7.11101 12.8229 6.65001 12.7949 6.76901C12.5849 7.00701 12.6769 7.40101 12.7249 7.48601C12.7949 7.62601 12.8509 7.71601 12.9849 7.78301C13.1099 7.87301 13.2049 7.81801 13.2589 7.75301C13.3829 7.62501 13.3849 7.29601 13.4429 7.23101C13.4829 7.11101 13.5859 7.13101 13.6359 7.18501C13.6859 7.25501 13.7419 7.30001 13.8129 7.33801C13.9289 7.44001 14.0669 7.45801 14.2029 7.36501C14.2959 7.31301 14.3569 7.24501 14.4109 7.11101C14.4709 6.95501 14.4409 6.13501 14.4279 5.67901L14.6879 6.05501C14.7239 6.45501 14.7409 6.85001 14.7279 7.22801C14.7199 7.30301 14.9909 7.00401 14.9879 6.86201C14.9879 6.73901 14.9899 6.62601 14.9879 6.52201C15.1209 6.73201 15.2479 6.94501 15.3679 7.16201C15.4429 7.12201 15.4179 6.69901 15.3709 6.64201C15.2449 6.43001 15.0829 6.20201 14.9579 6.02401C14.9329 5.80101 14.8999 5.53801 14.8839 5.45701C14.8609 5.33101 14.8369 5.14201 14.8009 4.99301C14.7909 4.93601 14.7609 4.75001 14.7709 4.73301C14.7849 4.69001 14.8409 4.73301 14.8679 4.68501C14.9079 4.64001 14.7259 4.16501 14.6329 4.03101C14.5999 3.97101 14.5389 3.99101 14.4649 4.09101C14.3949 4.15501 14.4209 4.30301 14.4469 4.44401C14.5149 4.80401 14.5769 5.16801 14.6249 5.53401C14.5349 5.39901 14.4249 5.23701 14.3169 5.08201L14.3029 5.01201C14.3029 5.00401 14.2889 4.71701 14.2759 4.64901C14.2729 4.62101 14.2659 4.61301 14.2959 4.61701C14.3259 4.64301 14.3299 4.64401 14.3489 4.65301C14.3809 4.65701 14.4089 4.60501 14.3889 4.55601L14.0989 4.02201C14.0889 4.00901 14.0749 3.99701 14.0589 3.99501L14.0639 3.99401ZM5.09386 4.00401C5.03886 4.00201 4.98086 4.03401 5.00386 4.09901C4.98986 4.13401 5.10786 4.25201 5.12886 4.31701C5.14586 4.36401 5.10886 4.51201 5.14886 4.52701C5.18386 4.54201 5.23286 4.42301 5.25086 4.31401C5.26086 4.25401 5.25386 4.04801 5.11386 4.00601C5.10686 4.00401 5.09986 4.00401 5.09186 4.00301L5.09386 4.00401ZM15.3139 4.00401C15.3009 4.00601 15.2859 4.02401 15.2639 4.07401C15.2089 4.16401 15.1899 4.32401 15.2119 4.46401C15.3419 5.35401 15.4419 6.21601 15.4619 7.00401C15.4499 7.08001 15.4459 7.12001 15.4119 7.21401C15.3339 7.31401 15.2479 7.43801 15.1669 7.49801C15.0869 7.55801 14.9149 7.61601 14.8589 7.66001C14.6789 7.76201 14.6789 7.88001 14.8229 7.88501C15.0709 7.85501 15.3649 7.83501 15.5669 7.53001C15.6209 7.44501 15.6849 7.21301 15.6869 7.07001C15.7069 6.24001 15.6769 5.42501 15.5519 4.82401C15.5439 4.76401 15.5179 4.63101 15.5279 4.61401C15.5429 4.57201 15.6239 4.61701 15.6529 4.57001C15.6959 4.52601 15.4429 4.20301 15.3549 4.06501C15.3369 4.03101 15.3249 4.00201 15.3109 4.00501L15.3139 4.00401ZM12.7109 4.01801C12.7009 4.02001 12.6869 4.03601 12.6589 4.07301C12.5889 4.29901 12.5649 4.48301 12.5919 4.62501C12.7719 5.55501 12.9519 6.40001 12.9239 7.28501C13.0079 7.28501 13.1059 7.09201 13.1479 6.90001C13.1709 6.63501 13.1319 6.47401 13.1259 6.32001C13.1189 6.16401 12.9499 4.90401 12.9159 4.78701C12.8739 4.56501 13.0799 4.75701 13.0579 4.62901C12.9859 4.46501 12.8079 4.22901 12.7539 4.08601C12.7339 4.04801 12.7299 4.01301 12.7139 4.01601L12.7109 4.01801ZM6.37686 4.03601C6.35686 4.04001 6.33386 4.05801 6.32686 4.08601C6.32186 4.10601 6.33486 4.13901 6.31686 4.14901C6.30686 4.15901 6.26886 4.15201 6.27086 4.09901C6.27086 4.08101 6.25786 4.06301 6.25086 4.05201C6.24286 4.04801 6.23786 4.04701 6.22386 4.04701C6.20686 4.04701 6.20686 4.05201 6.19786 4.06701C6.19386 4.08101 6.18786 4.09501 6.18786 4.11101C6.18586 4.13101 6.17786 4.13601 6.16486 4.13901C6.14886 4.13901 6.15186 4.14101 6.13986 4.13201C6.12986 4.12501 6.12186 4.12201 6.12186 4.10801C6.12186 4.09301 6.11786 4.06801 6.11386 4.06001C6.10686 4.05001 6.09586 4.04601 6.08386 4.04301C6.01786 4.04301 6.01386 4.12101 6.01686 4.14901C6.01186 4.15501 6.00986 4.28901 6.09986 4.32701C6.21986 4.38501 6.44786 4.36001 6.43986 4.16501C6.43986 4.14801 6.43486 4.09001 6.43286 4.07501C6.42086 4.04501 6.39786 4.03501 6.37586 4.03801L6.37686 4.03601ZM8.00286 4.03801C7.96086 4.04001 7.92286 4.05201 7.89286 4.06801C7.81286 4.14501 7.79286 4.26801 7.85686 4.34501C7.91686 4.37501 7.97986 4.43501 7.93886 4.47001C7.76486 4.65501 7.31186 4.96601 7.28886 5.02301V5.02901H7.29286V5.03101C7.31586 5.04601 7.59986 5.04601 7.63086 5.03101H7.63286C7.73086 4.99401 8.19286 4.46601 8.19286 4.46601C8.16886 4.44601 8.14686 4.43001 8.12286 4.40901C8.09686 4.38701 8.09986 4.36501 8.12286 4.34301C8.23686 4.27701 8.20086 4.13001 8.14086 4.06301C8.09086 4.04101 8.04486 4.03301 8.00286 4.03601V4.03801ZM12.2529 4.03801C12.2409 4.04101 12.2259 4.05801 12.2029 4.10801C12.1479 4.19801 12.1109 4.35301 12.1159 4.49801C12.2339 5.31801 12.2699 6.03501 12.3479 6.85501C12.3539 6.93501 12.3419 7.04901 12.2899 7.09501C12.0939 7.29901 11.8129 7.54901 11.5069 7.66501C11.4739 7.70201 11.5889 7.85901 11.7369 7.85901C11.9849 7.82901 12.2029 7.69101 12.4069 7.32401C12.4599 7.23901 12.5549 7.05601 12.5569 6.91401C12.5769 6.08201 12.5169 5.43401 12.3909 4.83401C12.3839 4.77401 12.3889 4.70401 12.3989 4.68801C12.4149 4.66801 12.4689 4.68801 12.4989 4.64101C12.5409 4.59701 12.3849 4.23801 12.2969 4.10101C12.2789 4.06601 12.2689 4.03801 12.2529 4.03901V4.03801ZM5.66886 4.06501C5.63486 4.06901 5.60286 4.09501 5.58686 4.13501C5.58186 4.26501 5.58086 4.39501 5.59686 4.51701C5.65686 4.73001 5.67386 4.91701 5.70286 5.13401C5.71286 5.42601 5.53486 5.26001 5.54286 5.11601C5.58286 4.92801 5.57286 4.63301 5.53686 4.55801C5.50686 4.48301 5.47486 4.46501 5.40486 4.47801C5.34986 4.47401 5.20686 4.62801 5.16686 4.88801C5.16686 4.88801 5.13286 5.02001 5.11886 5.13801C5.09886 5.27101 5.01086 5.36601 4.94886 5.12001C4.89586 4.94001 4.86386 4.50001 4.77486 4.60201C4.74886 4.94601 4.71886 5.55201 5.01086 5.61401C5.36486 5.64801 5.16886 5.01601 5.29686 4.90101C5.32186 4.84601 5.36686 4.84501 5.36986 4.91601V5.45301C5.36586 5.62701 5.47986 5.67901 5.56986 5.71501C5.66286 5.70801 5.72386 5.71101 5.75986 5.80101L5.80486 6.73101C5.80486 6.73101 6.01886 6.79101 6.02886 6.20801C6.03886 5.86501 5.95886 5.57801 6.00586 5.51101C6.00786 5.44501 6.09186 5.44101 6.14986 5.47401C6.24286 5.53901 6.28386 5.61901 6.42786 5.58701C6.64786 5.52701 6.77786 5.42101 6.78086 5.25301C6.77086 5.09301 6.75086 4.93301 6.68086 4.77301C6.69086 4.74501 6.64086 4.67001 6.65086 4.64101C6.68886 4.70101 6.74886 4.69701 6.76086 4.64101C6.72486 4.51801 6.66686 4.40101 6.57286 4.35101C6.49586 4.28101 6.38286 4.29601 6.34086 4.43801C6.32086 4.60201 6.40086 4.79601 6.52086 4.95501C6.54486 5.01701 6.58086 5.12001 6.56486 5.21301C6.50186 5.24901 6.43886 5.23301 6.38486 5.17801C6.38486 5.17801 6.21186 5.04801 6.21186 5.01801C6.25886 4.72301 6.22186 4.68801 6.19686 4.60801C6.17886 4.49401 6.12486 4.45801 6.08186 4.38001C6.03786 4.33301 5.97886 4.33301 5.95186 4.38001C5.87386 4.51301 5.90986 4.80001 5.96586 4.92701C6.00586 5.04501 6.06786 5.11901 6.03886 5.11901C6.01486 5.18401 5.96486 5.16901 5.92886 5.09201C5.87886 4.93201 5.86686 4.69601 5.86686 4.58901C5.85186 4.45701 5.83486 4.17401 5.74686 4.10201C5.72386 4.07001 5.69686 4.05901 5.66986 4.06201L5.66886 4.06501ZM6.91086 4.06501C6.89386 4.06901 6.87386 4.07901 6.85086 4.08501C6.77586 4.10801 6.70586 4.17301 6.72786 4.29901C6.81786 4.83901 6.87486 5.25201 6.96386 5.79201C6.97686 5.85601 6.92386 5.93901 6.85586 5.93201C6.73986 5.85201 6.71086 5.69201 6.51286 5.70001C6.36886 5.70001 6.20486 5.85801 6.18486 6.00801C6.16086 6.12801 6.15286 6.25801 6.18486 6.36201C6.28486 6.48201 6.40686 6.47001 6.51286 6.44201C6.59986 6.40701 6.67286 6.32201 6.70286 6.34201C6.72286 6.37501 6.70086 6.65601 6.29286 6.87201C6.04086 6.98601 5.84086 7.01201 5.73286 6.80801C5.66686 6.68001 5.73886 6.19201 5.57486 6.30401C5.08886 7.55601 6.71186 7.73001 6.89286 6.35601C6.90486 6.31601 6.93986 6.27801 6.96586 6.28801C6.97586 6.29301 6.98586 6.30801 6.98986 6.33601C6.95186 7.58001 5.73386 7.66601 5.52786 7.27401C5.47586 7.18201 5.46086 6.97601 5.45586 6.85401C5.44586 6.77901 5.42786 6.73601 5.40586 6.71901C5.35586 6.68201 5.28986 6.77901 5.27586 6.94601C5.25586 7.08101 5.26086 7.11801 5.26086 7.24801C5.32686 8.23101 6.89386 7.80801 7.14886 6.99801C7.27486 6.57801 7.14586 6.26101 7.18886 6.22201L7.19186 6.22001H7.19486L7.19986 6.21801C7.35586 6.38601 7.57386 6.23801 7.62186 6.18101C7.64186 6.15101 7.69386 6.13101 7.72986 6.17101C7.84986 6.25701 8.06386 6.21601 8.10786 6.06101C8.13386 5.91101 8.15586 5.75701 8.16086 5.59601C8.08086 5.62101 8.01686 5.63901 7.99086 5.66601C7.98486 5.67301 7.98086 5.68101 7.97886 5.68901L7.95886 5.82201C7.95886 5.82701 7.95686 5.83001 7.95486 5.83201C7.95186 5.83901 7.94486 5.84401 7.94086 5.84701C7.91286 5.86201 7.86386 5.85401 7.86086 5.81301C7.82386 5.64301 7.66886 5.62101 7.57486 5.88601C7.51186 5.93601 7.39486 5.94601 7.38486 5.87001C7.39986 5.69201 7.32786 5.66801 7.18486 5.75201L7.04686 4.71201C7.10686 4.70901 7.16086 4.75201 7.21686 4.68401C7.15686 4.50001 7.03186 4.12601 6.96086 4.09001H6.95886L6.94886 4.08001C6.94886 4.07801 6.94586 4.07701 6.94386 4.07601L6.93986 4.07001C6.93586 4.07001 6.93186 4.06801 6.92986 4.06701C6.92286 4.06501 6.91686 4.06501 6.90986 4.06501H6.91086ZM11.7529 4.06901C11.6909 4.06701 11.6229 4.10601 11.6489 4.18401C11.6329 4.22701 11.7819 4.37101 11.8059 4.44901C11.8489 4.56901 11.7729 4.68601 11.8179 4.70301C11.8599 4.72101 11.9179 4.57801 11.9379 4.44501C11.9639 4.33701 11.8879 4.11701 11.7779 4.07201L11.7529 4.07001V4.06901ZM7.97986 4.20001C8.00786 4.19801 8.04186 4.22401 8.05986 4.26001C8.07686 4.30001 8.06786 4.33701 8.03986 4.34401C8.00986 4.35101 7.97186 4.32601 7.95386 4.28601C7.93586 4.24601 7.94386 4.20901 7.97386 4.20201H7.97986V4.20001ZM14.9769 4.38201C14.9199 4.38001 14.8569 4.42201 14.8829 4.50701C14.8689 4.55301 15.0029 4.70901 15.0259 4.79501C15.0459 4.85501 14.9959 5.05101 15.0359 5.06901C15.0739 5.08901 15.1259 4.93301 15.1459 4.78901C15.1579 4.70901 15.0999 4.43401 15.0009 4.38501C14.9939 4.38301 14.9859 4.38101 14.9779 4.38101L14.9769 4.38201ZM11.1069 4.47801C11.1139 4.50101 11.1189 4.52401 11.1219 4.54801C11.1339 4.59801 11.1439 4.64801 11.1539 4.70001C11.1099 4.63801 11.0739 4.58801 11.0569 4.57001C10.9569 4.45001 11.0589 4.49201 11.1069 4.47801V4.47801ZM11.9999 4.91601C11.9779 4.92001 11.9569 4.93901 11.9499 4.96901C11.9439 4.98701 11.9579 5.01901 11.9399 5.02901C11.9299 5.03901 11.8899 5.03301 11.8929 4.97901C11.8929 4.96101 11.8799 4.94201 11.8729 4.93201C11.8649 4.92701 11.8599 4.92501 11.8459 4.92501C11.8289 4.92501 11.8289 4.93001 11.8199 4.94501C11.8159 4.95901 11.8099 4.97301 11.8099 4.99001C11.8099 5.01001 11.8019 5.01601 11.7879 5.02001C11.7719 5.02001 11.7749 5.02001 11.7619 5.01301C11.7539 5.00301 11.7449 5.00101 11.7449 4.98701C11.7449 4.97201 11.7419 4.94901 11.7369 4.93901C11.7299 4.92901 11.7199 4.92601 11.7069 4.92201C11.6419 4.92201 11.6369 4.99801 11.6409 5.02601C11.6369 5.03201 11.6339 5.16801 11.7239 5.20601C11.8459 5.26301 12.0739 5.23601 12.0639 5.04201C12.0639 5.02501 12.0589 4.96701 12.0579 4.95201C12.0449 4.92201 12.0219 4.91201 12.0009 4.91501L11.9999 4.91601ZM7.92986 4.95601C7.91586 4.95601 7.89586 4.96001 7.87286 4.97401C7.76586 5.03201 7.72486 5.20401 7.79286 5.30401C7.85286 5.39401 7.95286 5.36101 7.96586 5.36101C8.07086 5.37501 8.13286 5.16501 8.13286 5.16501C8.13286 5.16501 8.13586 5.10501 8.01286 5.21701C7.95886 5.22701 7.95286 5.20701 7.93886 5.17701C7.92686 5.12401 7.92886 5.06701 7.95386 5.01401C7.96586 4.98101 7.95386 4.96001 7.92986 4.95801V4.95601ZM13.6829 4.98301C13.6229 4.98001 13.5599 5.01901 13.5429 5.10001C13.5429 5.14801 13.5649 5.17401 13.5609 5.21801C13.5559 5.24301 13.5309 5.25801 13.4689 5.23001C13.4789 5.22001 13.4289 5.15201 13.4289 5.15201C13.3819 5.12201 13.3189 5.15201 13.2769 5.18001C13.2539 5.22201 13.2369 5.29301 13.2629 5.36501C13.3309 5.49201 13.5659 5.70801 13.6779 5.71001C13.6799 5.59601 13.6909 5.44401 13.6979 5.35001C13.6999 5.31401 13.7079 5.27501 13.7429 5.26601C13.7769 5.25601 13.8359 5.30001 13.8359 5.26301C13.8299 5.19101 13.8159 5.08301 13.7759 5.03301C13.7539 5.00301 13.7189 4.98501 13.6839 4.98301H13.6829ZM8.91986 5.38001L8.91686 5.38301C8.91686 5.38301 8.91486 5.38301 8.91386 5.38501C8.90186 5.39501 8.88786 5.41501 8.85686 5.43501C8.80386 5.49501 8.79486 5.53801 8.79686 5.65801C8.80086 5.67101 8.89686 5.94101 8.97986 6.13001C9.03586 6.32701 9.08686 6.55301 9.04986 6.76601C8.91986 7.04801 8.65986 7.30101 8.40686 7.43901C8.27686 7.47901 8.16686 7.46501 8.13686 7.43701C8.06286 7.38701 8.06186 7.29701 8.06686 7.28301V7.28001C8.27886 7.13201 8.52186 7.01201 8.71186 6.61301C8.76786 6.46001 8.78586 6.36801 8.72986 6.13301C8.70786 6.04301 8.67986 5.97301 8.61986 5.90901H8.62186C8.65786 5.89201 8.75186 5.96101 8.76686 5.91901C8.74386 5.80501 8.66686 5.65401 8.58186 5.57601C8.50586 5.50601 8.42186 5.49901 8.35386 5.56201C8.27586 5.60601 8.25986 5.76201 8.29686 5.89801C8.33886 6.00001 8.45186 6.01801 8.53186 6.22501C8.53386 6.23901 8.55886 6.38001 8.51886 6.43801C8.48486 6.54001 8.06386 6.87201 8.03386 6.89201L8.03086 6.89401L8.02886 6.89601H8.02686H8.02486V6.89301C8.02286 6.88501 8.02486 6.86301 8.02486 6.83001C8.02186 6.76801 8.04786 6.62701 8.04486 6.60201V6.60001C7.90486 6.69001 7.85786 6.96501 7.83286 7.04701C7.47986 7.29001 7.07986 7.47101 6.84886 7.71701C6.72886 7.90701 7.67686 7.50301 7.78686 7.45401L7.78986 7.45701C7.81186 7.48001 7.81286 7.56001 7.87586 7.63301C7.97586 7.76601 8.18386 7.84801 8.38786 7.79701C8.72986 7.67401 8.92786 7.44101 9.12786 7.18201C9.15586 7.14201 9.20086 7.10801 9.24286 7.14001C9.37986 7.44801 9.77786 7.66801 10.2909 7.69001C10.4109 7.54601 10.3539 7.47501 10.3059 7.44501C10.2909 7.43501 10.0509 7.34101 10.0129 7.24801C9.98986 7.16201 10.0469 7.08501 10.1609 7.02801C10.4909 6.98801 10.8149 6.94301 11.1289 6.84201C11.1319 6.73601 11.1939 6.57901 11.2359 6.51001C11.2659 6.46301 11.2829 6.45801 11.2899 6.45201V6.45001H11.2919V6.44701V6.43701L11.2379 6.40501L10.1849 6.40101C10.1719 6.39601 10.1629 6.39101 10.1569 6.38601L10.1549 6.38301C10.1549 6.38301 10.1529 6.38301 10.1529 6.38101C10.1529 6.37901 10.1509 6.37901 10.1509 6.37901V6.38001V6.37801V6.37601V6.37401L10.1529 6.37101C10.1579 6.36501 10.1709 6.35801 10.1859 6.35101C10.4379 6.31801 10.8839 6.24501 10.9139 5.81601C10.9089 5.59201 10.8179 5.44601 10.5439 5.40601C10.3419 5.42101 10.1979 5.61601 10.2209 5.83001C10.2109 5.88701 10.2409 6.00001 10.1809 6.01301C9.79486 6.04901 9.37286 6.29101 9.35886 6.46501H9.35686H9.35486H9.35286C9.35286 6.46701 9.35086 6.46701 9.34986 6.46701H9.34586H9.34386H9.33986C9.31486 6.45901 9.28286 6.41701 9.28786 6.36001C9.27286 6.06001 9.17486 5.72001 9.02286 5.46001C8.96786 5.40501 8.94286 5.38301 8.92886 5.38001H8.92586H8.92286H8.92086H8.91986ZM9.92786 5.53801C9.90786 5.54201 9.88486 5.56001 9.87786 5.59001C9.87286 5.61001 9.88786 5.64201 9.86986 5.65201C9.85986 5.66201 9.81986 5.65601 9.82186 5.60201C9.82186 5.58501 9.80886 5.56601 9.80186 5.55501C9.79386 5.55001 9.78886 5.54901 9.77586 5.54901C9.75886 5.54901 9.75786 5.55301 9.74886 5.56701C9.74386 5.58101 9.73886 5.59701 9.73886 5.61201C9.73686 5.63201 9.72886 5.63801 9.71586 5.64001C9.69986 5.64001 9.70386 5.64301 9.69086 5.63501C9.68286 5.62701 9.67286 5.62301 9.67286 5.60901C9.67286 5.59401 9.66986 5.56901 9.66586 5.55901C9.65886 5.55201 9.64786 5.54901 9.63586 5.54501C9.56886 5.54501 9.56586 5.62001 9.56886 5.64901C9.56386 5.65401 9.56086 5.78901 9.65086 5.82701C9.77086 5.88501 10.0609 5.85101 9.99086 5.66401C9.99086 5.64701 9.98586 5.58901 9.98486 5.57401C9.97186 5.54401 9.94886 5.53401 9.92686 5.53701L9.92786 5.53801ZM13.9929 5.70501H13.9829C13.9829 5.70501 13.4209 6.10501 13.4079 6.11901C13.3519 6.16901 13.3799 6.34201 13.4079 6.32201C13.4479 6.33701 14.0129 5.95401 14.0019 5.90901C14.0269 5.91101 14.0389 5.71201 13.9919 5.70401L13.9929 5.70501ZM10.4589 5.76501C10.4809 5.76201 10.5109 5.77001 10.5389 5.78501C10.5819 5.81101 10.6089 5.84701 10.6039 5.87501V5.87901C10.6019 5.87901 10.6019 5.87901 10.6019 5.88101V5.88301C10.6019 5.88301 10.5999 5.88301 10.5999 5.88501C10.5999 5.88701 10.5969 5.88901 10.5949 5.89101C10.5749 5.91101 10.5289 5.90701 10.4849 5.88101C10.4429 5.85801 10.4179 5.82101 10.4199 5.79501V5.79201L10.4249 5.78201C10.4249 5.78201 10.4249 5.78001 10.4269 5.77901L10.4319 5.77301C10.4389 5.76801 10.4479 5.76301 10.4589 5.76301V5.76501ZM5.54086 5.86501C5.25086 5.87101 4.82386 6.24701 4.81286 6.45501L5.73286 6.01501C5.68286 5.93901 5.72986 5.87101 5.54086 5.86501V5.86501ZM6.48386 5.99501C6.51186 5.99701 6.54186 6.01101 6.55786 6.05101C6.57186 6.08801 6.55786 6.12601 6.54086 6.14501V6.14801C6.52686 6.16401 6.48486 6.15801 6.45386 6.15801C6.41686 6.15601 6.39886 6.15001 6.37686 6.12001C6.36486 6.08501 6.39686 6.05201 6.41186 6.02801L6.41886 6.01801C6.42886 6.00801 6.44886 6.00001 6.46886 5.99801L6.48186 5.99601L6.48386 5.99501ZM13.8839 6.11201C13.8309 6.11801 13.7819 6.16701 13.8039 6.24501C13.7899 6.29101 13.8739 6.45201 13.8969 6.53701C13.9169 6.59701 13.8709 6.77001 13.9119 6.78701C13.9499 6.80701 14.0489 6.68701 14.0459 6.53301C14.0559 6.45301 14.0179 6.16301 13.9189 6.11501C13.9069 6.11201 13.8949 6.11101 13.8829 6.11201H13.8839ZM7.59986 6.39601C7.55386 6.39901 7.51286 6.42301 7.53186 6.48801C7.52886 6.53401 7.66186 6.59101 7.66886 6.69801C7.68686 6.74401 7.63886 6.88801 7.67886 6.90001C7.71486 6.91501 7.76486 6.80001 7.78386 6.69601C7.79386 6.63801 7.73786 6.43601 7.64386 6.39901C7.62886 6.39501 7.61386 6.39401 7.59886 6.39501L7.59986 6.39601ZM9.47986 6.65201H9.49186C9.60986 6.68401 9.78186 6.68801 9.93186 6.70201C10.0549 6.71201 10.1149 6.80601 10.0019 6.84701C9.88786 6.88501 9.77886 6.91701 9.77886 7.07901C9.79286 7.15901 9.78886 7.20101 9.77686 7.21901C9.77686 7.22201 9.77386 7.22401 9.77286 7.22501C9.77286 7.22501 9.77286 7.22701 9.77086 7.22701V7.22901H9.76786L9.76086 7.23201H9.75586C9.72886 7.23701 9.68986 7.21201 9.66086 7.19601C9.59086 7.14601 9.39586 7.02601 9.36786 6.76601C9.36386 6.70601 9.40786 6.65601 9.47786 6.65101L9.47986 6.65201ZM4.88586 6.85201C4.87886 6.85201 4.86586 6.87401 4.84586 6.89901C4.67186 7.17401 4.65586 7.58501 4.75186 7.70901C4.80186 7.76601 4.88586 7.79201 4.94786 7.77401C5.05786 7.72701 5.10486 7.50601 5.07786 7.42601C5.04286 7.36901 5.01386 7.36001 4.97786 7.40801C4.90086 7.56301 4.86786 7.45601 4.86286 7.36801C4.85086 7.20501 4.86686 7.05301 4.88486 6.93301C4.89486 6.87301 4.89486 6.85001 4.88486 6.85001L4.88586 6.85201ZM10.7829 7.21401C10.7699 7.21401 10.7569 7.21601 10.7429 7.22401C10.7399 7.22401 10.6189 7.30401 10.5799 7.36201C10.5559 7.38001 10.5599 7.39501 10.5659 7.42701C10.5839 7.47001 10.6159 7.45701 10.6539 7.43701C10.7039 7.42901 10.7269 7.46201 10.7239 7.52101C10.7009 7.59601 10.7339 7.62301 10.7339 7.62801C10.7339 7.63201 10.7809 7.67301 10.8369 7.64101C10.9539 7.59601 11.0269 7.55101 11.1919 7.51601C11.2349 7.51601 11.2319 7.40001 11.1639 7.39601C11.0739 7.40001 10.9939 7.40601 10.9039 7.47601C10.8489 7.48801 10.8399 7.45401 10.8269 7.42401C10.8129 7.35001 10.8589 7.29801 10.8489 7.24201C10.8509 7.24501 10.8209 7.21801 10.7819 7.21601L10.7829 7.21401ZM14.5589 7.35401L14.4789 7.36201C14.4429 7.36901 14.4309 7.38501 14.4239 7.42901C14.4269 7.49401 14.4669 7.49101 14.5089 7.51701C14.5329 7.54701 14.5489 7.57501 14.5069 7.62701C14.4669 7.66201 14.4399 7.68201 14.3999 7.71701C14.3829 7.74901 14.3699 7.79701 14.4279 7.81301C14.5329 7.84301 14.7759 7.68501 14.7759 7.68301C14.8159 7.65301 14.8019 7.59601 14.7989 7.59601C14.7749 7.57001 14.7229 7.58601 14.6889 7.58101C14.6719 7.58101 14.6189 7.57301 14.6429 7.52501C14.6649 7.49501 14.6729 7.47801 14.6879 7.44101C14.7029 7.40501 14.6879 7.38101 14.6299 7.36101C14.5999 7.35501 14.5799 7.35301 14.5569 7.35401H14.5589ZM13.1059 11.214C13.3759 11.227 13.6279 11.217 13.8959 11.23C13.9399 11.266 13.9189 11.35 13.8909 11.364L13.8859 11.366H13.8829H13.8789L13.6529 11.36V11.347C13.6309 11.285 13.4809 11.289 13.4449 11.337V11.34C13.4429 11.34 13.4419 11.343 13.4419 11.344L13.4399 11.349V11.361C13.3199 11.376 13.2149 11.357 13.0969 11.353C13.0619 11.31 13.0669 11.233 13.1069 11.213L13.1059 11.214Z" fill="white"/>
</svg>
`, "STP": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6593)">
<rect width="21" height="15" rx="3" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 11V15H21V11H0ZM0 0V4H21V0H0Z" fill="#00B731"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.4999 8.42L9.35495 9.023L9.57495 7.748L8.64795 6.845L9.92795 6.66L10.4999 5.5L11.0719 6.66L12.3519 6.845L11.4259 7.748L11.6459 9.023L10.4999 8.42ZM16.4999 8.42L15.3549 9.023L15.5749 7.748L14.6479 6.845L15.9279 6.66L16.4999 5.5L17.0719 6.66L18.3519 6.845L17.426 7.748L17.6459 9.023" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V15.033L7 7.5L0 0Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_6593">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "SMR": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 7H21V15H0V7Z" fill="#3A99FF"/>
<path opacity="0.2" fill-rule="evenodd" clip-rule="evenodd" d="M0 7H21V15H0V7Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 8.5C13 7.12 11.88 6 10.5 6C9.12 6 8 7.12 8 8.5C8 9.88 9.12 11 10.5 11C11.88 11 13 9.88 13 8.5ZM10.5 10C11.328 10 12 9.105 12 8C12 6.895 11.328 6 10.5 6C9.672 6 9 6.895 9 8C9 9.105 9.672 10 10.5 10Z" fill="#249F58"/>
<path d="M10.5 9C10.7761 9 11 8.55228 11 8C11 7.44772 10.7761 7 10.5 7C10.2239 7 10 7.44772 10 8C10 8.55228 10.2239 9 10.5 9Z" fill="#D4AF2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 4H13V5L10.5 6L8 5V4Z" fill="#D4AF2C"/>
</svg>
`, "WSM": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6603)">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H11V8H0V0Z" fill="#232C80"/>
<path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M5 2H6V3H5V2ZM7 3H8V4H7V3ZM6 4H7V5H6V4ZM5 5H6V6H5V5ZM4 3H5V4H4V3Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_20468_6603">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "VCT": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6608)">
<rect width="21" height="15" rx="3" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 0H21V15H15V0ZM8 7L9 5L10 7L9 9L8 7ZM11 7L12 5L13 7L12 9L11 7ZM9.5 9L10.5 7L11.5 9L10.5 11L9.5 9Z" fill="#0A6A30"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H6V15H0V0Z" fill="#1A47B8"/>
</g>
<defs>
<clipPath id="clip0_20468_6608">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "LCA": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#3ECBF8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 13L10.5 2L15 13H6Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 13L10.5 4L14 13H7Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 13L10.5 8L15 13H6Z" fill="#FFDA2C"/>
</svg>
`, "RWA": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6616)">
<rect width="21" height="15" rx="3" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 11H21V15H0V11Z" fill="#0A6A30"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V7H0V0Z" fill="#03BCDB"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16.974 3.974C17.57 3.908 18 3.72 18 3.5C18 3.28 17.57 3.092 16.974 3.026C16.908 2.43 16.72 2 16.5 2C16.28 2 16.092 2.43 16.026 3.026C15.43 3.092 15 3.28 15 3.5C15 3.72 15.43 3.908 16.026 3.974C16.092 4.57 16.28 5 16.5 5C16.72 5 16.908 4.57 16.974 3.974Z" fill="#FFDA2C"/>
</g>
<defs>
<clipPath id="clip0_20468_6616">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "RUS": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6620)">
<rect width="21" height="15" rx="3" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_20468_6620">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "ROU": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6623)">
<rect width="21" height="15" rx="3" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 0H21V15H14V0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H7V15H0V0Z" fill="#1A47B8"/>
</g>
<defs>
<clipPath id="clip0_20468_6623">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "MDA": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6768)">
<rect width="21" height="15" rx="3" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 5H13V10H8V5ZM8 10L10.5 12L13 10H8ZM10 4H11V5H10V4Z" fill="#AE6A3E"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 8H12V9.5H9V8ZM9 9.5L10.5 10.5L12 9.5H9Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 6H12V8H9V6Z" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 7C10.776 7 11 7.214 11 7.505V8.495C11 8.775 10.768 9 10.5 9C10.224 9 10 8.786 10 8.495V7.505C10 7.225 10.232 7 10.5 7V7Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 0H21V15H14V0Z" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H7V15H0V0Z" fill="#1A47B8"/>
</g>
<defs>
<clipPath id="clip0_20468_6768">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "KOR": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 7.5C14 9.433 12.433 11 10.5 11C8.567 11 7 9.433 7 7.5C7 6.38 9.35 5.91 11.328 6.087C11.538 6.031 11.764 6 12 6C13.105 6 14 6.672 14 7.5Z" fill="#232C80"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 7C10 7 10.895 6 12 6C13.105 6 14 6.672 14 7.5C14 5.567 12.433 4 10.5 4C9.103 4 7.897 4.818 7.336 6.002C7 7 7 7.292 7 7.5C7.5 8 8.056 8 8.5 8C8.944 8 9.343 7.807 9.618 7.5L10 7Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 5H17L15 3H14L15 5ZM6 5H4L6 3H7L6 5ZM15 10H17L15 12H14L15 10ZM6 10H4L6 12H7L6 10Z" fill="#151515"/>
</svg>
`, "QAT": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 0L8 1L5 2L8 3L5 4L8 5L5 6L8 7L5 8L8 9L5 10L8 11L5 12L8 13L5 14L8 15H0V0H5Z" fill="white"/>
</svg>
`, "PRT": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H7V15H0V0Z" fill="#249F58"/>
<path d="M7 10C8.65685 10 10 8.65685 10 7C10 5.34315 8.65685 4 7 4C5.34315 4 4 5.34315 4 7C4 8.65685 5.34315 10 7 10Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 8V5H5V8C5 8.552 5.895 9 7 9C8.105 9 9 8.552 9 8Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 6H8V8H6V6Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 6H7V7H6V6ZM7 7H8V8H7V7Z" fill="#1A47B8"/>
</svg>
`, "POL": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V8H0V0Z" fill="white"/>
</svg>
`, "PHL": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6639)">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V8H0V0Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V15.033L10 7.5L0 0Z" fill="white"/>
<path d="M2.5 11C2.77614 11 3 10.7761 3 10.5C3 10.2239 2.77614 10 2.5 10C2.22386 10 2 10.2239 2 10.5C2 10.7761 2.22386 11 2.5 11Z" fill="#FFDA2C"/>
<path d="M7.5 8C7.77614 8 8 7.77614 8 7.5C8 7.22386 7.77614 7 7.5 7C7.22386 7 7 7.22386 7 7.5C7 7.77614 7.22386 8 7.5 8Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.485 7.985C5.355 7.93 6 7.735 6 7.5C6 7.266 5.355 7.07 4.485 7.015C4.43 6.145 4.235 5.5 4 5.5C3.766 5.5 3.57 6.145 3.515 7.015C2.645 7.07 2 7.265 2 7.5C2 7.734 2.645 7.93 3.515 7.985C3.569 8.855 3.765 9.5 4 9.5C4.234 9.5 4.43 8.855 4.485 7.985V7.985Z" fill="#FFDA2C"/>
<path d="M2.5 5C2.77614 5 3 4.77614 3 4.5C3 4.22386 2.77614 4 2.5 4C2.22386 4 2 4.22386 2 4.5C2 4.77614 2.22386 5 2.5 5Z" fill="#FFDA2C"/>
</g>
<defs>
<clipPath id="clip0_20468_6639">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "PER": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6648)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H7V15H0V0ZM14 0H21V15H14V0Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_6648">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "PRY": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6652)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.97 7.19995C11.99 7.29695 12 7.39695 12 7.49995C12 8.32795 11.328 8.99995 10.5 8.99995C9.672 8.99995 9 8.32795 9 7.49995C9 7.39695 9.01 7.29695 9.03 7.19995C9.17 7.65595 9.774 7.99995 10.5 7.99995C11.226 7.99995 11.83 7.65595 11.97 7.19995Z" fill="#249F58"/>
<path d="M10.5 7C10.7761 7 11 6.77614 11 6.5C11 6.22386 10.7761 6 10.5 6C10.2239 6 10 6.22386 10 6.5C10 6.77614 10.2239 7 10.5 7Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_6652">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "PNG": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6658)">
<rect width="21" height="15" rx="3" fill="#AF010D"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 3L14 5C14 5 12 4 11 5L10 6H13L18 9L16 6H18C18 6 18 5 17 4C16 3 15 3 15 3V2L14 3H12Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L21 15H0V0Z" fill="#151515"/>
<path d="M5.5 13C5.77614 13 6 12.7761 6 12.5C6 12.2239 5.77614 12 5.5 12C5.22386 12 5 12.2239 5 12.5C5 12.7761 5.22386 13 5.5 13Z" fill="white"/>
<path d="M6.5 12C6.77614 12 7 11.7761 7 11.5C7 11.2239 6.77614 11 6.5 11C6.22386 11 6 11.2239 6 11.5C6 11.7761 6.22386 12 6.5 12Z" fill="white"/>
<path d="M7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10Z" fill="white"/>
<path d="M3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10Z" fill="white"/>
<path d="M5.5 8C5.77614 8 6 7.77614 6 7.5C6 7.22386 5.77614 7 5.5 7C5.22386 7 5 7.22386 5 7.5C5 7.77614 5.22386 8 5.5 8Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_20468_6658">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "PAN": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6668)">
<rect width="21" height="15" rx="3" fill="white"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.974 11.974C15.908 12.57 15.72 13 15.5 13C15.28 13 15.092 12.57 15.026 11.974C14.43 11.908 14 11.72 14 11.5C14 11.28 14.43 11.092 15.026 11.026C15.092 10.43 15.279 10 15.5 10C15.72 10 15.908 10.43 15.974 11.026C16.57 11.092 17 11.279 17 11.5C17 11.72 16.57 11.908 15.974 11.974Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 8H10V15H0V8Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.974 4.974C5.908 5.57 5.72 6 5.5 6C5.28 6 5.092 5.57 5.026 4.974C4.43 4.908 4 4.72 4 4.5C4 4.28 4.43 4.092 5.026 4.026C5.092 3.43 5.28 3 5.5 3C5.72 3 5.908 3.43 5.974 4.026C6.57 4.092 7 4.28 7 4.5C7 4.72 6.57 4.908 5.974 4.974Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 0H21V8H10V0Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_6668">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "PLW": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#3A99FF"/>
<path d="M9.5 12C11.9853 12 14 9.98528 14 7.5C14 5.01472 11.9853 3 9.5 3C7.01472 3 5 5.01472 5 7.5C5 9.98528 7.01472 12 9.5 12Z" fill="#FFDA2C"/>
</svg>
`, "PAK": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6682)">
<rect width="21" height="15" rx="3" fill="#0A6A30"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#0A6A30"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15.974 5.974C15.908 6.57 15.72 7 15.5 7C15.28 7 15.092 6.57 15.026 5.974C14.43 5.908 14 5.72 14 5.5C14 5.28 14.43 5.092 15.026 5.026C15.092 4.43 15.28 4 15.5 4C15.72 4 15.908 4.43 15.974 5.026C16.57 5.092 17 5.28 17 5.5C17 5.72 16.57 5.908 15.974 5.974ZM0 0H6V15H0V0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.97 6.968C17.99 7.143 18 7.32 18 7.5C18 9.985 15.985 12 13.5 12C11.015 12 9 9.985 9 7.5C9 5.015 11.015 3 13.5 3C13.68 3 13.857 3.01 14.032 3.03C12.32 3.26 11 4.727 11 6.5C11 8.433 12.567 10 14.5 10C16.274 10 17.74 8.68 17.97 6.968Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_20468_6682">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "OMN": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6687)">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 10H21V15H6V10Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.00021 0H21.0002V5H6.00021V0ZM4.57621 3.903C4.52121 3.986 4.45821 4.063 4.38621 4.136C3.79921 4.722 2.84921 4.722 2.26421 4.136C1.67821 3.551 1.67821 2.601 2.26421 2.016C2.33621 1.942 2.41421 1.879 2.49721 1.824C2.27221 2.244 2.45721 2.916 2.97121 3.429C3.48521 3.941 4.15621 4.127 4.57721 3.902L4.57621 3.903Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.42385 3.90297C2.47885 3.98597 2.54185 4.06297 2.61385 4.13597C3.20085 4.72197 4.15085 4.72197 4.73585 4.13597C5.32185 3.55097 5.32185 2.60097 4.73585 2.01597C4.66385 1.94197 4.58585 1.87897 4.50285 1.82397C4.72785 2.24397 4.54285 2.91597 4.02885 3.42897C3.51485 3.94097 2.84385 4.12697 2.42285 3.90197L2.42385 3.90297Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_20468_6687">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "NOR": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6692)">
<rect width="21" height="15" rx="3" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 9H0V6H6V0H9V6H21V9H9V15H6V9Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 8H0V7H7V0H8V7H21V8H8V15H7V8Z" fill="#1A47B8"/>
</g>
<defs>
<clipPath id="clip0_20468_6692">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "NGA": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6706)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H7V15H0V0ZM14 0H21V15H14V0Z" fill="#0A6A30"/>
</g>
<defs>
<clipPath id="clip0_20468_6706">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "NER": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6708)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#00B731"/>
<path d="M10.5 9C11.3284 9 12 8.32843 12 7.5C12 6.67157 11.3284 6 10.5 6C9.67157 6 9 6.67157 9 7.5C9 8.32843 9.67157 9 10.5 9Z" fill="#FF6C2D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#FF6C2D"/>
</g>
<defs>
<clipPath id="clip0_20468_6708">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "NIC": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6712)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10ZM0 0H21V5H0V0Z" fill="#1A47B8"/>
<path opacity="0.4" fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10ZM0 0H21V5H0V0Z" fill="#3A99FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 9L10.5 6L12 9H9Z" fill="#00B731"/>
</g>
<defs>
<clipPath id="clip0_20468_6712">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "NZL": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6716)">
<rect width="21" height="15" rx="3" fill="#1A47B8"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 4V5H16V4H15ZM17 6V7H18V6H17ZM13 7V8H14V7H13ZM15 11V12H16V11H15Z" fill="#F93939"/>
<path d="M9 1H2C1.44772 1 1 1.44772 1 2V7C1 7.55228 1.44772 8 2 8H9C9.55229 8 10 7.55228 10 7V2C10 1.44772 9.55229 1 9 1Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 5H2V4H5V2H6V4H9V5H6V7H5V5ZM7.5 6V7H9V6H7.5ZM7.5 2V3H9V2H7.5ZM2 6V7H3.5V6H2ZM2 2V3H3.5V2H2Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_6716">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "NLD": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6721)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#1E448D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#B01923"/>
</g>
<defs>
<clipPath id="clip0_20468_6721">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "NPL": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6724)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L13 8H6L13 15H0V0Z" fill="#003495"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1.00006 2L9.00006 7H3.00006L10.0001 14H1.00001C1 13.5 1.00006 13.544 1.00006 12.998V2Z" fill="#DF0A37"/>
<path d="M3.5 13C4.32843 13 5 12.3284 5 11.5C5 10.6716 4.32843 10 3.5 10C2.67157 10 2 10.6716 2 11.5C2 12.3284 2.67157 13 3.5 13Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.915 5C4.97 5.078 5 5.162 5 5.25C5 5.664 4.328 6 3.5 6C2.672 6 2 5.664 2 5.25C2 5.162 2.03 5.078 2.085 5C2.291 5.146 2.847 5.25 3.5 5.25C4.153 5.25 4.71 5.146 4.915 5Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_20468_6724">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "NRU": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#232C80"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.49812 12.23L6.02812 13.003L6.30812 11.366L5.12012 10.206L6.76312 9.969L7.49812 8.479L8.23212 9.969L9.87512 10.206L8.68512 11.366L8.96712 13.002" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 7H21V8H0V7Z" fill="#FFDA2C"/>
</svg>
`, "NAM": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6733)">
<rect width="21" height="15" rx="3" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 15H21V2L0 13V15Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.49812 5.23L3.02812 6.003L3.30812 4.366L2.12012 3.206L3.76312 2.969L4.49812 1.479L5.23212 2.969L6.87512 3.206L5.68512 4.366L5.96712 6.002" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 14L21 3V-1L0 10V14Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 16L21 5V1L0 12V16Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 15L21 4V0L0 11V15Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_6733">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "MMR": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6739)">
<rect width="21" height="15" rx="3" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5002 9.75L7.85522 11.14L8.36021 8.195L6.22021 6.11L9.17722 5.68L10.5002 3L11.8232 5.68L14.7802 6.11L12.6402 8.195L13.1452 11.141" fill="white"/>
</g>
<defs>
<clipPath id="clip0_20468_6739">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "MOZ": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6743)">
<rect width="21" height="15" rx="3" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#249F58"/>
<path opacity="0.35" fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 4H21V5H0V4ZM0 10H21V11H0V10Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V15.033L10 7.5L0 0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.378 8.75L1.908 9.523L2.188 7.886L1 6.726L2.643 6.489L3.378 5L4.112 6.49L5.755 6.727L4.565 7.887L4.847 9.523" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.27979 6.38403L2.63379 6.03003L4.75379 8.15203L4.40179 8.50503L2.27979 6.38503V6.38403Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.75479 6.38403L4.40179 6.03003L2.27979 8.15203L2.63379 8.50503L4.75379 6.38503L4.75479 6.38403Z" fill="#151515"/>
</g>
<defs>
<clipPath id="clip0_20468_6743">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "MAR": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5001 8.99001L9.03007 9.76001L9.31007 8.12501L8.12207 6.96501L9.76507 6.72701L10.5001 5.23901L11.2351 6.72601L12.8781 6.96601L11.6881 8.12401L11.9681 9.76001" fill="#249F58"/>
</svg>
`, "MNE": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#D4AF2C"/>
<rect x="1" y="1" width="19" height="13" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 4.778L9.333 4L8.556 4.778H9.333L8.556 5.556L7 4.778V8.668L9.333 7.888L8.556 9.444H7.778L8.556 10.222L9.333 9.444L10.5 11V4.778ZM11.667 4L12.444 4.778H11.667L12.444 5.556L14 4.778V8.668L11.667 7.888L12.444 9.444H13.222L12.444 10.222L11.667 9.444L10.5 11V4.778L11.667 4Z" fill="#D4AF2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 6.505C9 5.675 9.666 5 10.5 5C11.328 5 12 5.673 12 6.505V6.162C12 6.992 11.492 8.118 10.88 8.664L10.5 9L10.12 8.664C9.503 8.114 9 6.994 9 6.162V6.505Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 6H12V7H9V6Z" fill="#AE6A3E"/>
</svg>
`, "MNG": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6759)">
<rect width="21" height="15" rx="3" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H7V15H0V0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 7H3V11H2V7ZM5 7H6V11H5V7Z" fill="#FFDA2C"/>
<path d="M4 11C4.55228 11 5 10.5523 5 10C5 9.44772 4.55228 9 4 9C3.44772 9 3 9.44772 3 10C3 10.5523 3.44772 11 4 11Z" fill="#FFDA2C"/>
<path d="M4 8C4.55228 8 5 7.55228 5 7C5 6.44772 4.55228 6 4 6C3.44772 6 3 6.44772 3 7C3 7.55228 3.44772 8 4 8Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 3L5 5H3L4 3Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 0H21V15H14V0Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_6759">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "MCO": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 8H21V15H0V8Z" fill="white"/>
</svg>
`, "MEX": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6777)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.9806 7.28181C12.9933 7.38403 13 7.48847 13 7.59403C13 8.97458 11.8806 10.094 10.5 10.094C9.11944 10.094 8 8.97458 8 7.59403C8 7.48847 8.00667 7.38403 8.01944 7.28125C8.17333 8.24125 9.225 8.98292 10.5 8.98292C11.775 8.98292 12.8267 8.24069 12.9806 7.28125V7.28181Z" fill="#249F58"/>
<circle cx="10.5" cy="6.5" r="1.5" fill="#AE6A3E"/>
<rect x="15" width="6" height="15" fill="#F93939"/>
<rect width="6" height="15" fill="#249F58"/>
</g>
<defs>
<clipPath id="clip0_20468_6777">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "MUS": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6784)">
<rect width="21" height="15" rx="3" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 11H21V15H0V11Z" fill="#00B731"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 4H21V8H0V4Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V4H0V0Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_6784">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "MRT": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6788)">
<rect width="21" height="15" rx="3" fill="#249F58"/>
<rect y="13" width="21" height="2" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.4981 7.25002L9.02812 8.02302L9.30812 6.38602L8.12012 5.22602L9.76312 4.98902L10.4981 3.49902L11.2321 4.98902L12.8751 5.22602L11.6851 6.38602L11.9671 8.02202" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.965 5.93801C14.988 6.12201 15 6.31001 15 6.50001C15 8.98501 12.985 11 10.5 11C8.015 11 6 8.98501 6 6.50001C6 6.31001 6.012 6.12201 6.035 5.93701C6.312 7.66501 8.205 9.00001 10.5 9.00001C12.795 9.00001 14.688 7.66401 14.965 5.93701V5.93801Z" fill="#FFDA2C"/>
<rect width="21" height="2" fill="#AF010D"/>
</g>
<defs>
<clipPath id="clip0_20468_6788">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "MHL": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6793)">
<rect width="21" height="15" rx="3" fill="#1A47B8"/>
<path d="M5 7C6.10457 7 7 6.10457 7 5C7 3.89543 6.10457 3 5 3C3.89543 3 3 3.89543 3 5C3 6.10457 3.89543 7 5 7Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 15L21 6V3L0 15Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 15L21 0V3L0 15Z" fill="#FF6C2D"/>
</g>
<defs>
<clipPath id="clip0_20468_6793">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "MLT": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H11V15H0V0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 3H2V4H3V5H4V4H5V3H4V2H3V3Z" fill="#CBCBCB"/>
</svg>
`, "MLI": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6800)">
<rect width="21" height="15" rx="3" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 0H21V15H14V0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H7V15H0V0Z" fill="#00B731"/>
</g>
<defs>
<clipPath id="clip0_20468_6800">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "MDV": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 4H17V11H4V4Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.125 9.92C10.925 9.973 10.715 10 10.5 10C9.12 10 8 8.88 8 7.5C8 6.12 9.12 5 10.5 5C10.716 5 10.925 5.027 11.125 5.08C10.478 5.355 10 6.334 10 7.5C10 8.666 10.478 9.644 11.125 9.92Z" fill="white"/>
</svg>
`, "MYS": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="white"/>
<rect y="12.9231" width="21" height="1.07692" fill="#AF010D"/>
<rect y="10.7693" width="21" height="1.07692" fill="#AF010D"/>
<rect y="8.61548" width="21" height="1.07692" fill="#AF010D"/>
<rect y="6.46143" width="21" height="1.07692" fill="#AF010D"/>
<rect y="4.30762" width="21" height="1.07692" fill="#AF010D"/>
<rect y="2.15381" width="21" height="1.07692" fill="#AF010D"/>
<rect width="21" height="1.07692" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H11V8.62H0V0Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 4H8V5H7V4Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 6C7.044 6.607 6.318 7 5.5 7C4.12 7 3 5.88 3 4.5C3 3.12 4.12 2 5.5 2C6.318 2 7.044 2.393 7.5 3H6C5.172 3 4.5 3.672 4.5 4.5C4.5 5.328 5.172 6 6 6H7.5Z" fill="#FFDA2C"/>
</svg>
`, "MWI": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6818)">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14.2418 4C13.4348 2.794 12.0598 2 10.4998 2C8.93981 2 7.56481 2.794 6.75781 4H14.2418Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_6818">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "MDG": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6822)">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 8H21V15H0V8Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H8V15H0V0Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_20468_6822">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "MKD": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6695)">
<rect width="21" height="15" rx="3" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L10 7H11L4 0H0ZM0 15L10 8H11L4 15H0Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 7H10L17 0H21L11 7ZM11 8H10L17 15H21L11 8ZM8 7L0 6V9L8 8V7ZM13 7L21 6V9L13 8V7ZM10 5L9 0H12L11 5H10ZM10 10L9 15H12L11 10" fill="#FFDA2C"/>
<path d="M10.5 10C11.8807 10 13 8.88071 13 7.5C13 6.11929 11.8807 5 10.5 5C9.11929 5 8 6.11929 8 7.5C8 8.88071 9.11929 10 10.5 10Z" fill="#AF010D"/>
<path d="M10.5 9C11.3284 9 12 8.32843 12 7.5C12 6.67157 11.3284 6 10.5 6C9.67157 6 9 6.67157 9 7.5C9 8.32843 9.67157 9 10.5 9Z" fill="#FFDA2C"/>
</g>
<defs>
<clipPath id="clip0_20468_6695">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "LUX": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6825)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#3ECBF8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_6825">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "LTU": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6828)">
<rect width="21" height="15" rx="3" fill="#0A6A30"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#FFDA2C"/>
</g>
<defs>
<clipPath id="clip0_20468_6828">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "LIE": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V7H0V0Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 5H8V6H4V5Z" fill="#D4AF2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.01 3.142C4.702 3.062 4.35 3 4 3C3 3 3 3.5 3 4C3 4.5 4 5 4 5H8C8 5 9 4.5 9 4C9 3.5 9 3 8 3C7.65 3 7.298 3.062 6.99 3.142C6.997 3.095 7 3.048 7 3C7 2.448 6.552 2 6 2C5.448 2 5 2.448 5 3C5 3.048 5.003 3.095 5.01 3.142Z" fill="#FFDA2C"/>
</svg>
`, "LBY": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6835)">
<rect width="21" height="15" rx="3" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 11H21V15H0V11Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 7H13V8H12V7Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 9C12.044 9.607 11.318 10 10.5 10C9.12 10 8 8.88 8 7.5C8 6.12 9.12 5 10.5 5C11.318 5 12.044 5.393 12.5 6H11C10.172 6 9.5 6.672 9.5 7.5C9.5 8.328 10.172 9 11 9H12.5Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V4H0V0Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_6835">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "LBR": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6840)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 0H21V1H7V0ZM7 2H21V3H7V2ZM7 4H21V5H7V4ZM7 6H21V7H7V6ZM0 8H21V9H0V8ZM0 10H21V11H0V10ZM0 12H21V13H0V12Z" fill="#F93939"/>
<path d="M21 14H0V15H21V14Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H7V7H0V0Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.44 4.89705L1.932 5.69005L2.22 4.01005L1 2.82305L2.686 2.57805L3.44 1.05005L4.194 2.57705L5.88 2.82205L4.66 4.01205L4.948 5.69005" fill="white"/>
</g>
<defs>
<clipPath id="clip0_20468_6840">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "LSO": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6844)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 11H21V15H0V11Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.1 5.8L9 8H12L10.9 5.8C10.963 5.716 11 5.613 11 5.5C11 5.224 10.776 5 10.5 5C10.224 5 10 5.224 10 5.5C10 5.613 10.037 5.716 10.1 5.8ZM13 9C13 9.552 11.88 10 10.5 10C9.12 10 8 9.552 8 9V8H13V9Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V4H0V0Z" fill="#1A47B8"/>
</g>
<defs>
<clipPath id="clip0_20468_6844">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "LBN": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6848)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 11H21V15H0V11ZM0 0H21V4H0V0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 4L7 10H9L10.5 11L12 10H14L10.5 4Z" fill="#249F58"/>
</g>
<defs>
<clipPath id="clip0_20468_6848">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "LVA": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6851)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 9H21V15H0V9ZM0 0H21V6H0V0Z" fill="#AF010D"/>
</g>
<defs>
<clipPath id="clip0_20468_6851">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "LAO": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6853)">
<rect width="21" height="15" rx="3" fill="#232C80"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 10C11.88 10 13 8.88 13 7.5C13 6.12 11.88 5 10.5 5C9.12 5 8 6.12 8 7.5C8 8.88 9.12 10 10.5 10Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 11H21V15H0V11ZM0 0H21V4H0V0Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_6853">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "KGZ": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.206 9.485C10.303 9.495 10.401 9.5 10.5 9.5C10.6 9.5 10.697 9.495 10.794 9.485L10.5 8.75L10.206 9.485ZM8.85 8.94C8.327 8.526 8 7.922 8 7.25C8 6.457 8.456 5.76 9.144 5.36L10 7.5L8.85 8.94ZM11.856 5.36C12.544 5.76 13 6.457 13 7.25C13 7.923 12.672 8.527 12.15 8.94L11 7.5L11.856 5.36ZM11.756 5.304C11.386 5.11 10.958 5 10.5 5C10.042 5 9.613 5.11 9.244 5.304L10.5 6.874L11.756 5.304V5.304Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 12C12.985 12 15 9.985 15 7.5C15 5.015 12.985 3 10.5 3C8.015 3 6 5.015 6 7.5C6 9.985 8.015 12 10.5 12ZM10.5 11C12.433 11 14 9.433 14 7.5C14 5.567 12.433 4 10.5 4C8.567 4 7 5.567 7 7.5C7 9.433 8.567 11 10.5 11Z" fill="#FFDA2C"/>
</svg>
`, "KWT": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6859)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 15.033V0L7 5V10L0 15.033V15.033Z" fill="#151515"/>
</g>
<defs>
<clipPath id="clip0_20468_6859">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "KIR": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path d="M10.5 11C12.433 11 14 9.433 14 7.5C14 5.567 12.433 4 10.5 4C8.567 4 7 5.567 7 7.5C7 9.433 8.567 11 10.5 11Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 8H21V15H0V8Z" fill="#232C80"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 8H21V9H0V8ZM0 10H21V11H0V10ZM0 12H21V13H0V12Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 2L10.5 3L13 2H8Z" fill="#FFDA2C"/>
</svg>
`, "KEN": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 11H21V15H0V11Z" fill="#0A6A30"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V11H0V10Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 5H21V10H0V5Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 4H21V5H0V4Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.4142 5.91406C12.4862 5.91406 12.9142 5.24406 12.9142 4.41406C12.9142 3.58606 12.4862 2.91406 12.4142 2.91406C12.3442 2.91406 11.9142 3.58606 11.9142 4.41406C11.9142 5.24406 12.3442 5.91406 12.4142 5.91406ZM9.47516 5.47506C9.42516 5.52506 8.64516 5.35506 8.06116 4.76806C7.47616 4.18206 7.30416 3.40406 7.35516 3.35406C7.40516 3.30406 8.18316 3.47406 8.76916 4.06106C9.35516 4.64706 9.52616 5.42506 9.47616 5.47606L9.47516 5.47506ZM11.3542 10.0081C11.4042 9.96106 12.1842 10.1211 12.7692 10.6681C13.3542 11.2181 13.5262 11.9451 13.4762 11.9921C13.4262 12.0391 12.6462 11.8791 12.0602 11.3321C11.4752 10.7821 11.3032 10.0551 11.3542 10.0081ZM9.47516 10.0081C9.42516 9.96106 8.64516 10.1211 8.06116 10.6681C7.47616 11.2181 7.30416 11.9451 7.35516 11.9921C7.40516 12.0391 8.18316 11.8791 8.76916 11.3321C9.35516 10.7821 9.52616 10.0551 9.47616 10.0081H9.47516Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 12C10.857 12 13 9.985 13 7.5C13 5.015 10.857 3 10.5 3C10.143 3 8 5.015 8 7.5C8 9.985 10.143 12 10.5 12Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 9C8.57 9 9 8.328 9 7.5C9 6.672 8.57 6 8.5 6C8.43 6 8 6.672 8 7.5C8 8.328 8.43 9 8.5 9ZM12.5 9C12.57 9 13 8.328 13 7.5C13 6.672 12.57 6 12.5 6C12.43 6 12 6.672 12 7.5C12 8.328 12.43 9 12.5 9Z" fill="#151515"/>
<path d="M11 7.5C11 6.67157 10.7761 6 10.5 6C10.2239 6 10 6.67157 10 7.5C10 8.32843 10.2239 9 10.5 9C10.7761 9 11 8.32843 11 7.5Z" fill="white"/>
</svg>
`, "KAZ": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#03BCDB"/>
<path d="M11.5 9C12.8807 9 14 7.88071 14 6.5C14 5.11929 12.8807 4 11.5 4C10.1193 4 9 5.11929 9 6.5C9 7.88071 10.1193 9 11.5 9Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 7L9 9L11.5 10L14 9L15 7V10L11.5 11L8 10V7Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 2.495C2 2.222 2.232 2 2.5 2C2.776 2 3 2.216 3 2.495V4.505C3 4.778 2.768 5 2.5 5C2.224 5 2 4.784 2 4.505V2.495ZM3 4.495C3 4.222 3.232 4 3.5 4C3.776 4 4 4.216 4 4.495V6.505C4 6.778 3.768 7 3.5 7C3.224 7 3 6.784 3 6.505V4.495ZM3 8.495C3 8.222 3.232 8 3.5 8C3.776 8 4 8.216 4 8.495V10.505C4 10.778 3.768 11 3.5 11C3.224 11 3 10.784 3 10.505V8.495V8.495ZM2 10.495C2 10.222 2.232 10 2.5 10C2.776 10 3 10.216 3 10.495V12.505C3 12.778 2.768 13 2.5 13C2.224 13 2 12.784 2 12.505V10.495ZM2 6.5C2 6.224 2.232 6 2.5 6C2.776 6 3 6.232 3 6.5C3 6.776 2.768 7 2.5 7C2.224 7 2 6.768 2 6.5ZM3 2.5C3 2.224 3.232 2 3.5 2C3.776 2 4 2.232 4 2.5C4 2.776 3.768 3 3.5 3C3.224 3 3 2.768 3 2.5ZM2 7.5C2 7.224 2.232 7 2.5 7C2.776 7 3 7.232 3 7.5C3 7.776 2.768 8 2.5 8C2.224 8 2 7.768 2 7.5ZM3 12.5C3 12.224 3.232 12 3.5 12C3.776 12 4 12.232 4 12.5C4 12.776 3.768 13 3.5 13C3.224 13 3 12.768 3 12.5ZM2 8.5C2 8.224 2.232 8 2.5 8C2.776 8 3 8.232 3 8.5C3 8.776 2.768 9 2.5 9C2.224 9 2 8.768 2 8.5Z" fill="#FFDA2C"/>
</svg>
`, "JOR": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6881)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V15.033L13 7.5L0 0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 7.5L4 7L4.5 6L5 7L6 7.5L5 8L4.5 9L4 8L3 7.5Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_20468_6881">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "JPN": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="white"/>
<path d="M10.5 11C12.433 11 14 9.433 14 7.5C14 5.567 12.433 4 10.5 4C8.567 4 7 5.567 7 7.5C7 9.433 8.567 11 10.5 11Z" fill="#F93939"/>
</svg>
`, "JAM": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6888)">
<rect width="21" height="15" rx="3" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L10 8L0 15V0ZM21 0L11 8L21 15V0Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.667 7.5L0 1.5V0H1.5L10.5 6.23L19.5 0H21V1.5L12.333 7.5L21 13.5V15H19.5L10.5 8.77L1.5 15H0V13.5L8.667 7.5Z" fill="#FFDA2C"/>
</g>
<defs>
<clipPath id="clip0_20468_6888">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "ITA": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6895)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 0H21V15H14V0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H7V15H0V0Z" fill="#249F58"/>
</g>
<defs>
<clipPath id="clip0_20468_6895">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "ISR": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 11H21V13H0V11ZM0 2H21V4H0V2ZM9.875 9H8L8.938 7.5L8 6H9.875L10.5 5L11.125 6H13L12.062 7.5L13 9H11.125L10.5 10L9.875 9ZM9.5 7.5L10.5 6.5L11.5 7.5L10.5 8.5L9.5 7.5Z" fill="#1A47B8"/>
</svg>
`, "IRN": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6908)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 9C11.88 9 13 8.328 13 7.5C13 6.672 11.88 6 10.5 6C9.12 6 8 6.672 8 7.5C8 8.328 9.12 9 10.5 9ZM10.5 8.25C11.328 8.25 12 7.746 12 7.125C12 6.505 11.328 6 10.5 6C9.672 6 9 6.504 9 7.125C9 7.745 9.672 8.25 10.5 8.25Z" fill="#F93939"/>
<path d="M10.5 8C10.7761 8 11 7.55228 11 7C11 6.44772 10.7761 6 10.5 6C10.2239 6 10 6.44772 10 7C10 7.55228 10.2239 8 10.5 8Z" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#00B731"/>
</g>
<defs>
<clipPath id="clip0_20468_6908">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "IRL": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6900)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 0H21V15H14V0Z" fill="#FF6C2D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H7V15H0V0Z" fill="#249F58"/>
</g>
<defs>
<clipPath id="clip0_20468_6900">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "IRQ": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6904)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 8H11V8.495C11 8.785 11.224 9 11.5 9C11.768 9 12 8.774 12 8.495V6.495C12 6.222 12.232 6 12.5 6C12.776 6 13 6.216 13 6.495V8H14.49C14.772 8 15 8.232 15 8.5C15 8.776 14.778 9 14.49 9H6.51C6.228 9 6 8.768 6 8.5C6 8.288 6.13 8.107 6.32 8.034C6.345 7.97 6.383 7.909 6.436 7.857L7.856 6.437C8.05 6.243 8.371 6.25 8.561 6.439C8.757 6.634 8.763 6.944 8.565 7.142L7.707 8H9V7.505C9 7.225 9.232 7 9.5 7C9.776 7 10 7.214 10 7.505V8Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_6904">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "IDN": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V8H0V0Z" fill="#F93939"/>
</svg>
`, "IND": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6915)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 10C11.88 10 13 8.88 13 7.5C13 6.12 11.88 5 10.5 5C9.12 5 8 6.12 8 7.5C8 8.88 9.12 10 10.5 10ZM10.5 9C11.328 9 12 8.328 12 7.5C12 6.672 11.328 6 10.5 6C9.672 6 9 6.672 9 7.5C9 8.328 9.672 9 10.5 9Z" fill="#1A47B8"/>
<path d="M10.5 8C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7C10.2239 7 10 7.22386 10 7.5C10 7.77614 10.2239 8 10.5 8Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#FF6C2D"/>
</g>
<defs>
<clipPath id="clip0_20468_6915">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "ISL": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6920)">
<rect width="21" height="15" rx="3" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 9H0V6H6V0H9V6H21V9H9V15H6V9Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 7H0V8H7V15H8V8H21V7H8V0H7V7Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_6920">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "HUN": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6923)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_6923">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "HKG": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.155 7.5141C7.44296 6.3661 8.64496 2.8301 11.24 3.0061C10.714 3.2761 10.638 3.7801 10.938 4.2461C11.274 4.7701 10.908 5.6111 10.454 5.8161C9.70796 6.1511 9.55896 7.0461 10.154 7.5141H10.155ZM10.382 7.3921C10.635 4.4591 14.372 4.5091 15.002 7.0301C14.584 6.6151 14.082 6.6981 13.73 7.1281C13.337 7.6081 12.424 7.5181 12.09 7.1511C11.54 6.5471 10.64 6.6811 10.382 7.3931V7.3921ZM10.474 7.6851C13.354 7.0701 14.398 10.6571 12.171 11.9991C12.447 11.4761 12.221 11.0191 11.707 10.8091C11.133 10.5731 10.951 9.6741 11.205 9.2471C11.623 8.5441 11.231 7.7241 10.475 7.6841L10.474 7.6851ZM6.74996 10.9801C7.32996 11.0801 7.69496 10.7231 7.73596 10.1701C7.78296 9.5501 8.58096 9.1001 9.06596 9.2101C9.86396 9.3901 10.523 8.7641 10.326 8.0321C11.802 10.5821 8.71296 12.6821 6.74896 10.9791L6.74996 10.9801ZM6.15296 5.5001C6.26796 6.0781 6.73096 6.2901 7.26296 6.1301C7.85796 5.9521 8.56496 6.5361 8.63596 7.0301C8.75396 7.8381 9.57396 8.2281 10.186 7.7841C8.33596 10.0741 5.26596 7.9441 6.15296 5.4991V5.5001Z" fill="white"/>
</svg>
`, "HND": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6928)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10ZM7 6H8V7H7V6ZM7 8H8V9H7V8ZM13 6H14V7H13V6ZM13 8H14V9H13V8ZM10 7H11V8H10V7ZM0 0H21V5H0V0Z" fill="#3ECBF8"/>
</g>
<defs>
<clipPath id="clip0_20468_6928">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "VAT": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6931)">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 0H14C15.1046 0 16 0.895431 16 2V13C16 14.1046 15.1046 15 14 15H8V0Z" fill="white"/>
<path d="M10 6L13 9" stroke="#CBCBCB"/>
<path opacity="0.6" d="M11.5 7.5V10" stroke="#FF6C2D"/>
<path d="M13 6L10 9" stroke="#D4AF2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 6H13L11.5 4L10 6Z" fill="#D4AF2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H8V15H0V0Z" fill="#FFDA2C"/>
</g>
<defs>
<clipPath id="clip0_20468_6931">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "HTI": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V8H0V0Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 5H14.3333V10H6V5Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9.3335 6.66675H11.0002V10.0001H9.3335V6.66675Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.6665 7.5C7.6665 6.12 8.7765 5 10.1665 5C11.5465 5 12.6665 6.11 12.6665 7.5V10H7.6665V7.5ZM9.33317 7.50833C9.33317 7.04167 9.71984 6.66667 10.1665 6.66667C10.6265 6.66667 10.9998 7.02333 10.9998 7.50833V10H9.33317V7.50833Z" fill="#249F58"/>
</svg>
`, "GUY": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6947)">
<rect width="21" height="15" rx="3" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 15V0H3L21 6V9L3 15H0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L21 7.5L0 15V0Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 15V0H1L11 7.5L1 15H0Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L10 7.5L0 15V0Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_6947">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "GIN": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6957)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 0H21V15H14V0Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H7V15H0V0Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_6957">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "GNB": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6952)">
<rect width="21" height="15" rx="3" fill="#FFDA2C"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 8H21V15H0V8Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H8V15H0V0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.50007 8.75L3.03007 9.523L3.31007 7.886L2.12207 6.726L3.76507 6.489L4.50007 5L5.23507 6.49L6.87807 6.727L5.68807 7.887L5.96807 9.523" fill="#151515"/>
</g>
<defs>
<clipPath id="clip0_20468_6952">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "GTM": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6961)">
<rect width="21" height="15" rx="3" fill="white"/>
<path d="M10.5 8C10.7761 8 11 7.55228 11 7C11 6.44772 10.7761 6 10.5 6C10.2239 6 10 6.44772 10 7C10 7.55228 10.2239 8 10.5 8Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 7.5C13 6.12 11.88 5 10.5 5C9.12 5 8 6.12 8 7.5C8 8.88 9.12 10 10.5 10C11.88 10 13 8.88 13 7.5ZM10.5 9C11.328 9 12 8.105 12 7C12 5.895 11.328 5 10.5 5C9.672 5 9 5.895 9 7C9 8.105 9.672 9 10.5 9Z" fill="#249F58"/>
<rect x="15" width="6" height="15" fill="#3ECBF8"/>
<rect width="6" height="15" fill="#3ECBF8"/>
</g>
<defs>
<clipPath id="clip0_20468_6961">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "GRD": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 3H18V12H3V3Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 3L10.5 7.5L3 12V3Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4 7H5V8H4V7Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 3L10.5 7.5L18 12V3Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 1H8V2H7V1ZM10 1H11V2H10V1ZM13 1H14V2H13V1ZM7 13H8V14H7V13ZM10 13H11V14H10V13ZM13 13H14V14H13V13Z" fill="#FFDA2C"/>
<path d="M10.5 10C11.8807 10 13 8.88071 13 7.5C13 6.11929 11.8807 5 10.5 5C9.11929 5 8 6.11929 8 7.5C8 8.88071 9.11929 10 10.5 10Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5001 8.75L9.03007 9.523L9.31007 7.886L8.12207 6.726L9.76507 6.489L10.5001 5L11.2351 6.49L12.8781 6.727L11.6881 7.887L11.9681 9.523" fill="#FFDA2C"/>
</svg>
`, "GRC": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H4V4H0V0ZM6 0H10V4H6V0ZM0 6H4V10H0V6ZM6 6H10V10H6V6ZM10 0H21V2H10V0ZM10 4H21V6H10V4Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 8H21V10H0V8ZM4 8H6V10H4V8ZM0 12H21V14H0V12Z" fill="#1A47B8"/>
</svg>
`, "GHA": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6977)">
<rect width="21" height="15" rx="3" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5001 8.75L9.03007 9.523L9.31007 7.886L8.12207 6.726L9.76507 6.489L10.5001 5L11.2351 6.49L12.8781 6.727L11.6881 7.887L11.9681 9.523" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_6977">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "DEU": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6981)">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#151515"/>
</g>
<defs>
<clipPath id="clip0_20468_6981">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "GEO": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6984)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 9H0V6H9V0H12V6H21V9H12V15H9V9Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M15 11H14V12H15V13H16V12H17V11H16V10H15V11ZM15 3H14V4H15V5H16V4H17V3H16V2H15V3ZM5 3H4V4H5V5H6V4H7V3H6V2H5V3ZM5 11H4V12H5V13H6V12H7V11H6V10H5V11Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_6984">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "GMB": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6987)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 6H21V9H0V6Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_6987">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "GAB": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6992)">
<rect width="21" height="15" rx="3" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#3A99FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#249F58"/>
</g>
<defs>
<clipPath id="clip0_20468_6992">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "FRA": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6995)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 0H21V15H14V0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H7V15H0V0Z" fill="#1A47B8"/>
</g>
<defs>
<clipPath id="clip0_20468_6995">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "FIN": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6998)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 9H0V6H6V0H9V6H21V9H9V15H6V9Z" fill="#1A47B8"/>
</g>
<defs>
<clipPath id="clip0_20468_6998">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "FJI": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#3ECBF8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M18 10V6.5C18 5.665 17.328 5 16.5 5H14.5C13.674 5 13 5.67 13 6.5V10C13 10.182 14 12 15.5 12C17 12 18 10.177 18 10Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 8V9.118H18V10.08H16V12H15V10.08H13V9.118H15V8H13V5H18V8H16Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 6H17V7H14V6Z" fill="#FFDA2C"/>
<path d="M9 1H2C1.44772 1 1 1.44772 1 2V7C1 7.55228 1.44772 8 2 8H9C9.55229 8 10 7.55228 10 7V2C10 1.44772 9.55229 1 9 1Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 5H2V4H5V2H6V4H9V5H6V7H5V5ZM7.5 6V7H9V6H7.5ZM7.5 2V3H9V2H7.5ZM2 6V7H3.5V6H2ZM2 2V3H3.5V2H2Z" fill="#F93939"/>
</svg>
`, "FSM": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#3A99FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 4H9.495C9.215 4 9 4.224 9 4.5C9 4.768 9.222 5 9.495 5H10V5.505C10 5.785 10.224 6 10.5 6C10.768 6 11 5.778 11 5.505V5H11.505C11.785 5 12 4.776 12 4.5C12 4.232 11.778 4 11.505 4H11V3.495C11 3.215 10.776 3 10.5 3C10.232 3 10 3.222 10 3.495V4ZM14 7H13.495C13.215 7 13 7.224 13 7.5C13 7.768 13.222 8 13.495 8H14V8.505C14 8.785 14.224 9 14.5 9C14.768 9 15 8.778 15 8.505V8H15.505C15.785 8 16 7.776 16 7.5C16 7.232 15.778 7 15.505 7H15V6.495C15 6.215 14.776 6 14.5 6C14.232 6 14 6.222 14 6.495V7ZM10 10H9.495C9.215 10 9 10.224 9 10.5C9 10.768 9.222 11 9.495 11H10V11.505C10 11.785 10.224 12 10.5 12C10.768 12 11 11.778 11 11.505V11H11.505C11.785 11 12 10.776 12 10.5C12 10.232 11.778 10 11.505 10H11V9.495C11 9.215 10.776 9 10.5 9C10.232 9 10 9.222 10 9.495V10ZM6 7H5.495C5.215 7 5 7.224 5 7.5C5 7.768 5.222 8 5.495 8H6V8.505C6 8.785 6.224 9 6.5 9C6.768 9 7 8.778 7 8.505V8H7.505C7.785 8 8 7.776 8 7.5C8 7.232 7.778 7 7.505 7H7V6.495C7 6.215 6.776 6 6.5 6C6.232 6 6 6.222 6 6.495V7Z" fill="white"/>
</svg>
`, "ETH": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7006)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#249F58"/>
<path d="M10.5 12C12.9853 12 15 9.98528 15 7.5C15 5.01472 12.9853 3 10.5 3C8.01472 3 6 5.01472 6 7.5C6 9.98528 8.01472 12 10.5 12Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.4981 8.75002L9.02812 9.52302L9.30812 7.88602L8.12012 6.72602L9.76312 6.48902L10.4981 4.99902L11.2321 6.48902L12.8751 6.72602L11.6851 7.88602L11.9671 9.52202" fill="#FFDA2C"/>
</g>
<defs>
<clipPath id="clip0_20468_7006">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "EST": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7021)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#3A99FF"/>
</g>
<defs>
<clipPath id="clip0_20468_7021">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "ERI": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7025)">
<rect width="21" height="15" rx="3" fill="#3A99FF"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#3A99FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V8H0V0Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L21 7.5L0 15V0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 7.49998C9 6.11998 7.88 4.99998 6.5 4.49998C5.12 4.99998 4 6.11998 4 7.49998C4 8.70998 4.86 9.71798 6 9.94998V6.49798C6 6.22298 6.232 5.99998 6.5 5.99998C6.776 5.99998 7 6.21498 7 6.49798V9.94998C8.14 9.71798 9 8.70998 9 7.49998V7.49998ZM10 7.49998C10 5.56698 8.433 3.99998 6.5 4.49998C4.567 3.99998 3 5.56698 3 7.49998C3 9.43298 4.567 11 6.5 11C8.433 11 10 9.43298 10 7.49998Z" fill="#FFDA2C"/>
</g>
<defs>
<clipPath id="clip0_20468_7025">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "GNQ": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7030)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 8C11.776 8 12 7.776 12 7.5C12 7.224 11.776 7 11.5 7C11.224 7 11 7.224 11 7.5C11 7.776 11.224 8 11.5 8ZM13.5 8C13.776 8 14 7.776 14 7.5C14 7.224 13.776 7 13.5 7C13.224 7 13 7.224 13 7.5C13 7.776 13.224 8 13.5 8Z" fill="#00B731"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 7H13V9H12V7Z" fill="#AE6A3E"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 7C10.776 7 11 6.776 11 6.5C11 6.224 10.776 6 10.5 6C10.224 6 10 6.224 10 6.5C10 6.776 10.224 7 10.5 7ZM12.5 7C12.776 7 13 6.776 13 6.5C13 6.224 12.776 6 12.5 6C12.224 6 12 6.224 12 6.5C12 6.776 12.224 7 12.5 7ZM14.5 7C14.776 7 15 6.776 15 6.5C15 6.224 14.776 6 14.5 6C14.224 6 14 6.224 14 6.5C14 6.776 14.224 7 14.5 7Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#00B731"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V15.033L7 7.5L0 0Z" fill="#3A99FF"/>
</g>
<defs>
<clipPath id="clip0_20468_7030">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "SLV": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7038)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10ZM0 0H21V5H0V0Z" fill="#1A47B8"/>
<path d="M10.5 9C11.3284 9 12 8.32843 12 7.5C12 6.67157 11.3284 6 10.5 6C9.67157 6 9 6.67157 9 7.5C9 8.32843 9.67157 9 10.5 9Z" fill="#1A47B8"/>
<path d="M10.5 8C10.7761 8 11 7.77614 11 7.5C11 7.22386 10.7761 7 10.5 7C10.2239 7 10 7.22386 10 7.5C10 7.77614 10.2239 8 10.5 8Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 7L9 8L10.5 9L12 8L13 7L12 9H9L8 7Z" fill="#249F58"/>
</g>
<defs>
<clipPath id="clip0_20468_7038">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "EGY": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7043)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 7L9 6L8 7L9 9L10 8H11L12 9L13 7L12 6L10.5 7Z" fill="#D4AF2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_7043">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "ECU": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7048)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 11H21V15H0V11Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V8H0V0Z" fill="#FFDA2C"/>
<path d="M10.5 10C11.3284 10 12 9.10457 12 8C12 6.89543 11.3284 6 10.5 6C9.67157 6 9 6.89543 9 8C9 9.10457 9.67157 10 10.5 10Z" fill="#3ECBF8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 7V9L10 10H11L13 9V7L14 9L13 10L11 11H10L8 10L7 9L8 7Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 4H9L10.5 5L12 4H15L12 5L11 6H10L9 5L6 4Z" fill="#151515"/>
</g>
<defs>
<clipPath id="clip0_20468_7048">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "DOM": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7055)">
<rect width="21" height="15" rx="3" fill="white"/>
<rect x="12" y="9" width="9" height="6" fill="#1A47B8"/>
<rect y="9" width="9" height="6" fill="#F93939"/>
<circle cx="10.5" cy="7.5" r="1.5" fill="#249F58"/>
<circle cx="0.5" cy="0.5" r="0.5" transform="matrix(-1 0 0 1 12 8)" fill="#232C80"/>
<circle cx="0.5" cy="0.5" r="0.5" transform="matrix(-1 0 0 1 10 8)" fill="#F93939"/>
<circle cx="10.5" cy="7.5" r="0.5" fill="white"/>
<circle cx="11.5" cy="6.5" r="0.5" fill="#F93939"/>
<circle cx="9.5" cy="6.5" r="0.5" fill="#232C80"/>
<rect x="12" width="9" height="6" fill="#F93939"/>
<rect width="9" height="6" fill="#1A47B8"/>
</g>
<defs>
<clipPath id="clip0_20468_7055">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "DMA": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7066)">
<rect width="21" height="15" rx="3" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 7H0V8H10V15H11V8H21V7H11V0H10V7Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 6V7H10V0H9V6H0V7H10V6H9ZM10 7H21V6H9V7H10V6H9V15H10V7Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 9V8H11V15H12V9H21V8H11V9H12ZM0 8H13V9H0V8ZM11 0H12V9H11V0Z" fill="white"/>
<path d="M10.5 11C12.433 11 14 9.433 14 7.5C14 5.567 12.433 4 10.5 4C8.567 4 7 5.567 7 7.5C7 9.433 8.567 11 10.5 11Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 6H10V7H9V6ZM11 6H12V7H11V6ZM11 8H12V9H11V8ZM9 8H10V9H9V8Z" fill="#0A6A30"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 6H11V8H10V6Z" fill="#955DCC"/>
</g>
<defs>
<clipPath id="clip0_20468_7066">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "DJI": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7073)">
<rect width="21" height="15" rx="3" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V8H0V0Z" fill="#3ECBF8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L12 7.5L0 15V0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.50007 8.75L3.03007 9.523L3.31007 7.886L2.12207 6.726L3.76507 6.489L4.50007 5L5.23507 6.49L6.87807 6.727L5.68807 7.887L5.96807 9.523" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_7073">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "DNK": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7077)">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 9H0V6H6V0H9V6H21V9H9V15H6V9Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_20468_7077">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "PRK": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 11H21V12H0V11Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 4H21V11H0V4Z" fill="#F93939"/>
<path d="M5.5 10C6.88071 10 8 8.88071 8 7.5C8 6.11929 6.88071 5 5.5 5C4.11929 5 3 6.11929 3 7.5C3 8.88071 4.11929 10 5.5 10Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.49811 8.47597L4.29811 9.10597L4.52811 7.77097L3.55811 6.82697L4.89811 6.63197L5.49811 5.41797L6.09811 6.63297L7.43811 6.82897L6.46811 7.77397L6.69811 9.10997" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 3H21V4H0V3Z" fill="white"/>
</svg>
`, "COD": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7079)">
<rect width="21" height="15" rx="3" fill="#3A99FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.49812 5.23L3.02812 6.003L3.30812 4.366L2.12012 3.206L3.76312 2.969L4.49812 1.479L5.23212 2.969L6.87512 3.206L5.68512 4.366L5.96712 6.002" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 14L21 3V-1L0 10V14Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 16L21 5V1L0 12V16Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 15L21 4V0L0 11V15Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_7079">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "CIV": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_6891)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 0H21V15H14V0Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H7V15H0V0Z" fill="#FF6C2D"/>
</g>
<defs>
<clipPath id="clip0_20468_6891">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "CZE": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7084)">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V7H0V0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L10 7.5L0 15V0Z" fill="#1A47B8"/>
</g>
<defs>
<clipPath id="clip0_20468_7084">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "CYP": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 9L10 11V12L4 10L5 9ZM16 9L11 11V12L17 10L16 9ZM10 11H11V13H10V11Z" fill="#0A6A30"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 6C5 6 6 9 9 9C12 9 15 6 15 6H13L16 3L10 5L8 3L7 5L5 6Z" fill="#FF6C2D"/>
</svg>
`, "CUW": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#1A47B8"/>
<path d="M21 9H0V11H21V9Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 5H4.49539C4.21575 5 4 5.22386 4 5.5C4 5.76807 4.22179 6 4.49539 6H5V6.50461C5 6.78425 5.22386 7 5.5 7C5.76807 7 6 6.77821 6 6.50461V6H6.50461C6.78425 6 7 5.77614 7 5.5C7 5.23193 6.77821 5 6.50461 5H6V4.49539C6 4.21575 5.77614 4 5.5 4C5.23193 4 5 4.22179 5 4.49539V5ZM3 3H4V4H3V3Z" fill="white"/>
</svg>
`, "CUB": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7093)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 6H21V9H0V6ZM0 12H21V15H0V12Z" fill="#1A47B8"/>
<rect width="21" height="3" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L12 7.5L0 15V0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.378 8.75L2.908 9.523L3.188 7.886L2 6.726L3.643 6.489L4.378 5L5.113 6.49L6.756 6.727L5.566 7.887L5.846 9.523" fill="white"/>
</g>
<defs>
<clipPath id="clip0_20468_7093">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "HRV": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#1A47B8"/>
<mask id="mask0_20468_7098" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="8" y="5" width="5" height="6">
<path d="M13 8.5C13 9.88 11.88 11 10.5 11C9.12 11 8 9.88 8 8.5V5H13V8.5Z" fill="white"/>
</mask>
<g mask="url(#mask0_20468_7098)">
<path d="M13 8.5C13 9.88 11.88 11 10.5 11C9.12 11 8 9.88 8 8.5V5H13V8.5Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 10H10V11H9V10ZM11 10H12V11H11V10ZM10 9H11V10H10V9ZM9 8H10V9H9V8ZM11 8H12V9H11V8ZM10 7H11V8H10V7ZM9 6H10V7H9V6ZM11 6H12V7H11V6ZM10 5H11V6H10V5ZM12 5H13V6H12V5ZM12 7H13V8H12V7ZM12 9H13V10H12V9ZM8 9H9V10H8V9ZM8 7H9V8H8V7ZM8 5H9V6H8V5Z" fill="white"/>
</g>
</svg>
`, "CRI": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V12H0V10Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 5H21V10H0V5Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 3H21V5H0V3Z" fill="white"/>
</svg>
`, "COG": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7111)">
<rect width="21" height="15" rx="3" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 15L19 0H21V15H6Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 15L21 0H14L0 15H7Z" fill="#FFDA2C"/>
</g>
<defs>
<clipPath id="clip0_20468_7111">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "COM": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7114)">
<rect width="21" height="15" rx="3" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 11H21V15H0V11Z" fill="#232C80"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 7.5H21V11H0V7.5Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V4H0V0Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L12 7.5L0 15V0Z" fill="#00B731"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 10.84C5.71 10.944 5.4 11 5.077 11C3.377 11 2 9.433 2 7.5C2 5.567 3.378 4 5.077 4C5.399 4 5.709 4.056 6 4.16C4.752 4.606 3.846 5.933 3.846 7.5C3.846 9.067 4.752 10.394 6 10.84ZM6 5H7V6H6V5ZM6 7H7V8H6V7ZM6 9H7V10H6V9Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_20468_7114">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "COL": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7120)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 11H21V15H0V11Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V7H0V0Z" fill="#FFDA2C"/>
</g>
<defs>
<clipPath id="clip0_20468_7120">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "CHN": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7124)">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.49812 7.23L4.02812 8.003L4.30812 6.366L3.12012 5.206L4.76312 4.969L5.49812 3.479L6.23212 4.969L7.87512 5.206L6.68512 6.366L6.96712 8.002L5.49812 7.23ZM9.00012 3H10.0001V4H9.00012V3ZM10.0001 5H11.0001V6H10.0001V5ZM10.0001 7H11.0001V8H10.0001V7ZM9.00012 9H10.0001V10H9.00012V9Z" fill="#FFDA2C"/>
</g>
<defs>
<clipPath id="clip0_20468_7124">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "CHL": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7127)">
<rect width="21" height="15" rx="3" fill="white"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 8H21V15H0V8Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H9V8H0V0Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.50007 5.22707L3.03007 6.00007L3.31007 4.36407L2.12207 3.20407L3.76507 2.96607L4.50007 1.47607L5.23507 2.96607L6.87807 3.20607L5.68807 4.36407L5.97007 6.00007" fill="white"/>
</g>
<defs>
<clipPath id="clip0_20468_7127">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "TCD": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7132)">
<rect width="21" height="15" rx="3" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 0H21V15H14V0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H7V15H0V0Z" fill="#232C80"/>
</g>
<defs>
<clipPath id="clip0_20468_7132">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "CAF": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7135)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 8H21V11H0V8Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 2H4V3H3V2Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M2 2H3V3H2V2ZM4 2H5V3H4V2ZM3 3H4V4H3V3ZM3 1H4V2H3V1Z" fill="#D4AF2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 0H12V15H9V0Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_7135">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "CAN": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7148)">
<rect width="21" height="15" rx="3" fill="white"/>
<path d="M10.7059 11.6176H10.2941L10.3971 9.97059C10.3912 9.88385 10.3496 9.86105 10.1912 9.86765L8.54412 10.0735C8.54412 10.0735 8.85294 9.66176 8.85294 9.45588C8.85294 9.25 7 7.91176 7 7.91176C7 7.91176 7.41176 7.80882 7.51471 7.70588C7.61765 7.60294 7.10294 6.47059 7.10294 6.47059C7.10294 6.47059 8.14906 6.88235 8.23529 6.77941C8.32153 6.67647 8.44118 6.26471 8.44118 6.26471C8.44118 6.26471 9.26471 7.19118 9.47059 7.19118C9.67647 7.19118 9.05882 4.92647 9.05882 4.92647C9.05882 4.92647 9.57353 5.33824 9.77941 5.33824C9.98529 5.33824 10.5 4 10.5 4C10.5 4 11.0147 5.33824 11.1176 5.33824C11.2206 5.33824 11.9412 4.92647 11.9412 4.92647C11.9412 4.92647 11.4265 7.08824 11.5294 7.19118C11.6324 7.29412 12.5588 6.26471 12.5588 6.26471C12.5588 6.26471 12.6618 6.67647 12.7647 6.77941C12.8676 6.88235 13.8971 6.47059 13.8971 6.47059C13.8971 6.47059 13.3824 7.60294 13.4853 7.70588C13.5882 7.80882 14 7.91176 14 7.91176C14 7.91176 12.1471 9.25 12.1471 9.45588C12.1471 9.66176 12.3529 10.0735 12.3529 10.0735L10.8088 9.86765C10.6847 9.83206 10.6417 9.85907 10.6029 9.97059L10.7059 11.6176Z" fill="#F93939"/>
<rect x="16" width="5" height="15" fill="#F93939"/>
<rect width="5" height="15" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_7148">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "CMR": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7152)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5001 8.75L9.03007 9.523L9.31007 7.886L8.12207 6.726L9.76507 6.489L10.5001 5L11.2351 6.49L12.8781 6.727L11.6881 7.887L11.9681 9.523" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 0H21V15H14V0Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H7V15H0V0Z" fill="#249F58"/>
</g>
<defs>
<clipPath id="clip0_20468_7152">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "KHM": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7157)">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 5H8.5L9 6H8V5ZM9 6H10V7H9V6ZM8 7H9V8H8V7ZM7 8H8V9H7V8ZM7 9H8V10H7V9ZM6.5 9H7V10H6L6.5 9ZM9 8H11V10H9V8ZM13 5H12.5L12 6H13V5ZM12 6H11V7H12V6ZM13 7H12V8H13V7ZM14 8H13V9H14V8ZM14 9H13V10H14V9ZM14.5 9H14V10H15L14.5 9ZM12 8H11V10H12V8Z" fill="white"/>
<path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M9 7H10V8H9V7ZM8 8H9V10H8V8ZM8 6H9V7H8V6ZM7.5 7H8V8H7L7.5 7ZM12 7H11V8H12V7ZM13 8H12V10H13V8ZM13 6H12V7H13V6ZM13.5 7H13V8H14L13.5 7ZM11 6H10V8H11V6Z" fill="white"/>
<path opacity="0.7" fill-rule="evenodd" clip-rule="evenodd" d="M10 5H11V6H10V5Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V4H0V0ZM0 11H21V15H0V11Z" fill="#232C80"/>
</g>
<defs>
<clipPath id="clip0_20468_7157">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "CPV": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V11H0V10Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 9H21V10H0V9Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 8H21V9H0V8Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 7H6V8H5V7ZM7 6H8V7H7V6ZM9 7H10V8H9V7ZM10 9H11V10H10V9ZM4 9H5V10H4V9ZM9 11H10V12H9V11ZM7 12H8V13H7V12ZM5 11H6V12H5V11Z" fill="#FFDA2C"/>
</svg>
`, "BDI": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7162)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L10 8L0 15V0ZM21 0L11 8L21 15V0Z" fill="#00B731"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7.158 6.456L0 1.5V0H1.5L8.347 4.74C8.94 4.276 9.687 4 10.5 4C11.312 4 12.06 4.276 12.653 4.74L19.5 0H21V1.5L13.842 6.456C13.945 6.786 14 7.136 14 7.5C14 7.864 13.945 8.214 13.842 8.544L21 13.5V15H19.5L12.653 10.26C12.059 10.724 11.313 11 10.5 11C9.688 11 8.94 10.724 8.347 10.26L1.5 15H0V13.5L7.158 8.544C7.055 8.214 7 7.864 7 7.5C7 7.136 7.055 6.786 7.158 6.456V6.456Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 6H11V7H10V6ZM11 8H12V9H11V8ZM9 8H10V9H9V8Z" fill="#AF010D"/>
</g>
<defs>
<clipPath id="clip0_20468_7162">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "BFA": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7167)">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 8H21V15H0V8Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.4999 9.25L8.44292 10.332L8.83592 8.042L7.16992 6.417L9.46992 6.083L10.4999 4L11.5299 6.084L13.8299 6.418L12.1639 8.041L12.5569 10.333" fill="#FFDA2C"/>
</g>
<defs>
<clipPath id="clip0_20468_7167">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "BGR": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7171)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_20468_7171">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "BRN": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7175)">
<rect width="21" height="15" rx="3" fill="#FFDA2C"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L21 10V14L0 4V0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 3L21 13V15L0 5V3Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 7L9 8V12L7 11V9L5 7L7 5L8 6V7ZM9 9H12V10H9V9ZM13 7L12 8V12L14 11V9L16 7L14 5L13 6V7ZM9 6H12L10.5 3L9 6Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_7175">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "BRA": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 2L18 7.5L10.5 13L3 7.5" fill="#FFDA2C"/>
<path d="M10.5 11C12.433 11 14 9.433 14 7.5C14 5.567 12.433 4 10.5 4C8.567 4 7 5.567 7 7.5C7 9.433 8.567 11 10.5 11Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 9V10H10V9H9ZM11 9V10H12V9H11Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 6C8 6 10.264 6.4 11.896 7.098L14 8" fill="white"/>
<path d="M8 6C8 6 10.264 6.4 11.896 7.098L14 8" stroke="white"/>
</svg>
`, "BVT": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7185)">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M6 9H0V6H6V0H9V6H21V9H9V15H6V9Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M7 8H0V7H7V0H8V7H21V8H8V15H7V8Z" fill="#1A47B8"/>
</g>
<defs>
<clipPath id="clip0_20468_7185">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "BWA": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#3ECBF8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 9H21V10H0V9Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 6H21V9H0V6Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 5H21V6H0V5Z" fill="white"/>
</svg>
`, "BIH": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7192)">
<rect width="21" height="15" rx="3" fill="#FFDA2C"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0L21 14L20.877 15.1L0 15V0Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M1 3H2V4H1V3ZM4 5H5V6H4V5ZM7 7H8V8H7V7ZM10 9H11V10H10V9ZM13 11H14V12H13V11ZM16 13H17V14H16V13Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_20468_7192">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "BOL": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7196)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 7H10V8H9V7ZM11 7H12V8H11V7Z" fill="#03BCDB"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 7H13V9H12V7ZM11 6H12V7H11V6ZM9 6H10V7H9V6ZM8 7H9V9H8V7Z" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 8H11V9H10V8Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 8H12V9H11V8ZM9 8H10V9H9V8Z" fill="#D4AF2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 7H11V8H10V7Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 6H11V7H10V6Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_7196">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "BTN": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7206)">
<rect width="21" height="15" rx="3" fill="#FF6C2D"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#FF6C2D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 15L21 0H0V15Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 10L3.5 11.5L5.5 12L6 11L10 11.5L9 9H11L14 10L15 9L12 8L13 7H16L16.5 6H14V5H16L17 4L13 3L11 5L10 6L11 7L8 6.5L6 10L5 11L3 10Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_20468_7206">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "BEN": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7210)">
<rect width="21" height="15" rx="3" fill="#FFDA2C"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 8H21V15H8V8Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H8V15H0V0Z" fill="#249F58"/>
</g>
<defs>
<clipPath id="clip0_20468_7210">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "BLZ": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7214)">
<rect width="21" height="15" rx="3" fill="#1A47B8"/>
<path d="M10.5 12C12.9853 12 15 9.98528 15 7.5C15 5.01472 12.9853 3 10.5 3C8.01472 3 6 5.01472 6 7.5C6 9.98528 8.01472 12 10.5 12Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 8H12.5V9H8.5V8Z" fill="#CBCBCB"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M8 5H9V6H8V5ZM10 4H11V5H10V4ZM12 5H13V6H12V5ZM13 7H14V8H13V7ZM12 9H13V10H12V9Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 7H12V8H11V7Z" fill="#AE6A3E"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 7H10V8H9V7Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 10H11V11H10V10ZM8 9H9V10H8V9ZM7 7H8V8H7V7Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 6H12V7H11V6Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 6H10V7H9V6Z" fill="#AE6A3E"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 13H21V15H0V13ZM0 0H21V2H0V0Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_7214">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "BEL": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7224)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 0H21V15H14V0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H7V15H0V0Z" fill="#151515"/>
</g>
<defs>
<clipPath id="clip0_20468_7224">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "BLR": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7228)">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 11H21V15H5V11Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M3 0L5 1.5L3 3V0ZM3 3L5 4.5L3 6V3ZM3 6L5 7.5L3 9V6ZM3 9L5 10.5L3 12V9ZM3 12L5 13.5L3 15V12ZM2 0L0 1.5L2 3V0ZM2 3L0 4.5L2 6V3ZM2 6L0 7.5L2 9V6ZM2 9L0 10.5L2 12V9ZM2 12L0 13.5L2 15V12ZM2 0H3V2H2V0ZM2 13H3V15H2V13ZM2 5H3V7H2V5ZM2 3H3V4H2V3ZM2 11H3V12H2V11ZM2 8H3V10H2V8Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_20468_7228">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "BRB": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7232)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H7V15H0V0ZM14 0H21V15H14V0Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 10H11V11H10V10ZM12 8H13V9H12V8ZM8 8H9V9H8V8Z" fill="#AE6A3E"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 8V4H10V8H9V9H10V10H11V9H12V8H11ZM12 5H13V8H12V5ZM8 5H9V8H8V5Z" fill="#151515"/>
</g>
<defs>
<clipPath id="clip0_20468_7232">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "BGD": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7237)">
<rect width="21" height="15" rx="3" fill="#249F58"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#249F58"/>
<path d="M9.5 12C11.9853 12 14 9.98528 14 7.5C14 5.01472 11.9853 3 9.5 3C7.01472 3 5 5.01472 5 7.5C5 9.98528 7.01472 12 9.5 12Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_7237">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "BHR": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H7V15H0V0ZM7 0L9 1.5L7 3V0ZM7 3L9 4.5L7 6V3ZM7 6L9 7.5L7 9V6ZM7 9L9 10.5L7 12V9ZM7 12L9 13.5L7 15V12Z" fill="white"/>
</svg>
`, "BHS": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7242)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10ZM0 0H21V5H0V0Z" fill="#3ECBF8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V15.033L11 7.5L0 0Z" fill="#151515"/>
</g>
<defs>
<clipPath id="clip0_20468_7242">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "AZE": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7246)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 7H13V8H12V7Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 9C12.044 9.607 11.318 10 10.5 10C9.12 10 8 8.88 8 7.5C8 6.12 9.12 5 10.5 5C11.318 5 12.044 5.393 12.5 6H11C10.172 6 9.5 6.672 9.5 7.5C9.5 8.328 10.172 9 11 9H12.5Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#3ECBF8"/>
</g>
<defs>
<clipPath id="clip0_20468_7246">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "AUT": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7252)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10ZM0 0H21V5H0V0Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_7252">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "AUS": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7268)">
<rect width="21" height="15" rx="3" fill="#1A47B8"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#1A47B8"/>
<path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M4 11.5L5 11L5.5 10L6 11L7 11.5L6 12L5.5 13L5 12L4 11.5ZM14 3V4H15V3H14ZM17 4V5H18V4H17ZM13 6V7H14V6H13ZM16 7V8H17V7H16ZM15 10V11H16V10H15Z" fill="white"/>
<path d="M9 1H2C1.44772 1 1 1.44772 1 2V7C1 7.55228 1.44772 8 2 8H9C9.55229 8 10 7.55228 10 7V2C10 1.44772 9.55229 1 9 1Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M5 5H2V4H5V2H6V4H9V5H6V7H5V5ZM7.5 6V7H9V6H7.5ZM7.5 2V3H9V2H7.5ZM2 6V7H3.5V6H2ZM2 2V3H3.5V2H2Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_7268">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "ABW": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7255)">
<rect width="21" height="15" rx="3" fill="#3ECBF8"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#3ECBF8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 9H21V10H0V9ZM0 11H21V12H0V11Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.485 4.485C5.355 4.43 6 4.235 6 4C6 3.766 5.355 3.57 4.485 3.515C4.43 2.645 4.235 2 4 2C3.766 2 3.57 2.645 3.515 3.515C2.645 3.57 2 3.765 2 4C2 4.234 2.645 4.43 3.515 4.485C3.57 5.355 3.765 6 4 6C4.234 6 4.43 5.355 4.485 4.485Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.485 4.485C5.355 4.43 6 4.235 6 4C6 3.766 5.355 3.57 4.485 3.515C4.43 2.645 4.235 2 4 2C3.766 2 3.57 2.645 3.515 3.515C2.645 3.57 2 3.765 2 4C2 4.234 2.645 4.43 3.515 4.485C3.57 5.355 3.765 6 4 6C4.234 6 4.43 5.355 4.485 4.485ZM4.515 4.985L4.985 4.515C4.91 5.713 4.66 6.5 4 6.5C3.34 6.5 3.09 5.712 3.016 4.516L3.484 4.984C2.288 4.91 1.5 4.66 1.5 4C1.5 3.34 2.288 3.09 3.484 3.016L3.016 3.484C3.09 2.288 3.34 1.5 4 1.5C4.66 1.5 4.91 2.288 4.984 3.484L4.516 3.016C5.712 3.09 6.5 3.34 6.5 4C6.5 4.66 5.712 4.91 4.516 4.984L4.515 4.985Z" fill="white"/>
</g>
<defs>
<clipPath id="clip0_20468_7255">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "ARM": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7260)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#1A47B8"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H21V5H0V0Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_7260">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "ARG": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7264)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 10H21V15H0V10ZM0 0H21V5H0V0Z" fill="#3ECBF8"/>
<path d="M10.5 9C11.3284 9 12 8.32843 12 7.5C12 6.67157 11.3284 6 10.5 6C9.67157 6 9 6.67157 9 7.5C9 8.32843 9.67157 9 10.5 9Z" fill="#FFDA2C"/>
</g>
<defs>
<clipPath id="clip0_20468_7264">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "ATG": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7273)">
<rect width="21" height="15" rx="3" fill="#151515"/>
<rect width="21" height="15" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 9H21V15H0V9Z" fill="white"/>
<path d="M10.5 9C12.433 9 14 7.433 14 5.5C14 3.567 12.433 2 10.5 2C8.567 2 7 3.567 7 5.5C7 7.433 8.567 9 10.5 9Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 6H21V9H0V6Z" fill="#3A99FF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 15H0V0L11 15Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10 15H21V0L10 15Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_7273">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "AGO": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7280)">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 8H21V15H0V8Z" fill="#151515"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.451 9.58586C12.885 9.00386 13.141 8.28186 13.141 7.49986C13.141 6.03286 12.238 4.77686 10.958 4.25586L10.353 5.10286C11.387 5.40986 12.141 6.36686 12.141 7.49986C12.141 8.09386 11.934 8.63986 11.588 9.06786L8.141 6.99986L10.837 9.69586C10.482 9.88986 10.074 9.99986 9.641 9.99986C8.801 9.99986 8.058 9.58586 7.605 8.94986L7 9.79686C7.641 10.5339 8.586 10.9999 9.641 10.9999C10.351 10.9999 11.013 10.7879 11.565 10.4239L12.141 10.9999L13.141 9.99986L12.451 9.58586ZM8.141 4.99986H9.141V5.99986H8.141V4.99986Z" fill="#FFDA2C"/>
</g>
<defs>
<clipPath id="clip0_20468_7280">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "AND": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7284)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11.936 9.935C12.55 9.748 13 9.177 13 8.5V5.5C13 4.665 12.328 4 11.5 4H9.5C8.674 4 8 4.67 8 5.5V8.5C8 9.182 8.448 9.75 9.064 9.936C9.25 10.556 9.822 11 10.5 11C11.182 11 11.75 10.55 11.936 9.935Z" fill="#D4AF2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M9 5H10V6.5H9V5ZM11 7H12V8.5H11V7Z" fill="#AF010D"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M11 5H12V6.5H11V5ZM9 7H10V8.5H9V7Z" fill="#FFDA2C"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 0H21V15H14V0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H7V15H0V0Z" fill="#1A47B8"/>
</g>
<defs>
<clipPath id="clip0_20468_7284">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "DZA": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7291)">
<rect width="21" height="15" rx="3" fill="white"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H10V15H0V0Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13.052 10.263C12.23 11.32 10.944 12 9.5 12C7.015 12 5 9.985 5 7.5C5 5.015 7.015 3 9.5 3C10.944 3 12.23 3.68 13.052 4.737C12.417 4.275 11.618 4 10.75 4C8.68 4 7 5.567 7 7.5C7 9.433 8.68 11 10.75 11C11.618 11 12.417 10.725 13.052 10.263Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 7.5L14 7L14.5 6L15 7L16 7.5L15 8L14.5 9L14 8L13 7.5Z" fill="#F93939"/>
</g>
<defs>
<clipPath id="clip0_20468_7291">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "ALB": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7296)">
<rect width="21" height="15" rx="3" fill="#F93939"/>
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 4L9 3L8 4H9L8 5L6 4V9L9 8L8 10H7L8 11L9 10L10.5 12V4ZM12 3L13 4H12L13 5L15 4V9L12 8L13 10H14L13 11L12 10L10.5 12V4L12 3Z" fill="#151515"/>
</g>
<defs>
<clipPath id="clip0_20468_7296">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, "AFG": svg`<svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_20468_7299)">
<path d="M19 0H2C0.89543 0 0 0.89543 0 2V13C0 14.1046 0.89543 15 2 15H19C20.1046 15 21 14.1046 21 13V2C21 0.89543 20.1046 0 19 0Z" fill="#F93939"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 10C11.88 10 13 8.88 13 7.5C13 6.12 11.88 5 10.5 5C9.12 5 8 6.12 8 7.5C8 8.88 9.12 10 10.5 10ZM10.5 9C11.328 9 12 8.105 12 7C12 5.895 11.328 5 10.5 5C9.672 5 9 5.895 9 7C9 8.105 9.672 9 10.5 9ZM10.5 8C10.776 8 11 7.552 11 7C11 6.448 10.776 6 10.5 6C10.224 6 10 6.448 10 7C10 7.552 10.224 8 10.5 8Z" fill="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M14 0H21V15H14V0Z" fill="#249F58"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M0 0H7V15H0V0Z" fill="#151515"/>
</g>
<defs>
<clipPath id="clip0_20468_7299">
<rect width="21" height="15" rx="3" fill="white"/>
</clipPath>
</defs>
</svg>
`, 
  };

  render() {
    if (this.hidden) {
      return nothing;
    }
    return html`
     ${parseThemeToCssVariables(this.theme?.components?.icon, "svg")}

      <style>
        :host {
          display: inherit;
          cursor: ${parseVariables(
            cssVar("cursor", this.cursor),
            this.cursor,
            "inherit"
          )};
        }
        
        svg {
          margin: ${parseVariables(
            cssVar("margin", this.margin),
            this.margin,
            cssVar("margin", this.size),
          )};

          padding: ${parseVariables(
            cssVar("padding", this.padding),
            this.padding,
            cssVar("padding", this.size),
          )};

          width: ${parseVariables(cssVar("width", this.width), this.width)};
          height: ${parseVariables(cssVar("height", this.height), this.height)};
          font-size: ${parseVariables(
            cssVar("font-size", this.size),
            this.size
          )};
        }
      </style>
      
      ${CountryIcon.svgs[this.code || this.iconName]}
    `;
  }

  static styles = css`
    svg {
      height: 1em;
      width: 1em;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ssk-country-icon": CountryIcon;
  }
}

if (!customElements.get("ssk-country-icon")) {
  customElements.define("ssk-country-icon", CountryIcon);
}
