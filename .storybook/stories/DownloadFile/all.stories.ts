import { spread } from "@open-wc/lit-helpers";
import { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "../../../src/components/download-file";
import "../../../src/components/progress-bar"
import { DownloadFile } from "../../../src/components/download-file";
import "../../../src/elements/icon";
import { AutoLitProperty, baseArgsTypes } from "../helper";

type DownloadFileWithLabel = AutoLitProperty<DownloadFile> & { label: string };

const meta: Meta<DownloadFileWithLabel> = {
    title: "Example/DownloadFile",
    tags: [""],
    render: ({ label, ...args }) => {
        return html`
        <ssk-text size="lg">
                    ---------------------{ Download File size md }---------------------
        </ssk-text>
        <div class="all" style="display: flex;">
            <div class="md" style="display: flex; flex-direction: column; align-items: center;">
                <ssk-download-file  ${spread(args)}
                    ><ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-prefix"
                    ></ssk-icon>
                    <div slot="label-name">
                        <span>file name.xlsx</span>
                    </div>
                    <ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-postfix"
                        size="xs"
                    ></ssk-icon>
                    <div slot="footer">
                        <ssk-progress-bar
                            label="Loading Data..."
                            size="sm"
                            status="in-progress"
                            value="0"
                        ></ssk-progress-bar>
                    </div>
                </ssk-download-file>

                <ssk-download-file  ${spread(args)}
                    ><ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-prefix"
                    ></ssk-icon>
                    <div slot="label-name">
                        <span>FILE_NAME.xlsx</span>
                    </div>
                    <ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-postfix"
                        size="xs"
                    ></ssk-icon>
                    <div slot="footer">
                        <ssk-progress-bar
                            label="Loading Data..."
                            size="sm"
                            status="in-progress"
                            value="30"
                        ></ssk-progress-bar>
                    </div>
                </ssk-download-file>

                <ssk-download-file  ${spread(args)}
                    ><ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-prefix"
                    ></ssk-icon>
                    <div slot="label-name">
                        <span>FILE_NAME.xlsx</span>
                    </div>
                    <ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-postfix"
                        size="xs"
                    ></ssk-icon>
                    <div slot="footer">
                        <ssk-progress-bar
                            label="Loading Data..."
                            size="sm"
                            status="in-progress"
                            value="50"
                        ></ssk-progress-bar>
                    </div>
                </ssk-download-file>

                <ssk-download-file  ${spread(args)}
                    ><ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-prefix"
                    ></ssk-icon>
                    <div slot="label-name">
                        <span>FILE_NAME.xlsx</span>
                    </div>
                    <ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-postfix"
                        size="xs"
                    ></ssk-icon>
                    <div slot="footer">
                        <ssk-progress-bar
                            label="Loading Data..."
                            size="sm"
                            status="in-progress"
                            value="70"
                        ></ssk-progress-bar>
                    </div>
                </ssk-download-file>

                <ssk-download-file  ${spread(args)}
                    ><ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-prefix"
                    ></ssk-icon>
                    <div slot="label-name">
                        <span>FILE_NAME.xlsx</span>
                    </div>
                    <ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-postfix"
                        size="xs"
                    ></ssk-icon>
                    <div slot="footer">
                        <ssk-progress-bar
                            label="Loading Data..."
                            size="sm"
                            status="in-progress"
                            value="90"
                        ></ssk-progress-bar>
                    </div>
                </ssk-download-file>

                <ssk-download-file  ${spread(args)}
                    ><ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-prefix"
                    ></ssk-icon>
                    <div slot="label-name">
                        <span>FILE_NAME.xlsx</span>
                    </div>
                    <ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-postfix"
                        size="xs"
                    ></ssk-icon>
                    <div slot="footer">
                        <ssk-progress-bar
                            label="Loading Data..."
                            size="sm"
                            status="in-progress"
                            value="100"
                        ></ssk-progress-bar>
                    </div>
                </ssk-download-file>

                <ssk-download-file  ${spread(args)}
                    ><ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-prefix"
                    ></ssk-icon>
                    <div slot="label-name">
                        <span>FILE_NAME.xlsx</span>
                    </div>
                    <ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-postfix"
                        size="xs"
                    ></ssk-icon>
                    <div slot="footer">
                        <ssk-progress-bar
                            label="Completed"
                            size="sm"
                            status="success"
                            value="100"
                            styleOfProgress="icon"
                        ></ssk-progress-bar>
                    </div>
                </ssk-download-file>

                <ssk-download-file  ${spread(args)}
                    ><ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-prefix"
                    ></ssk-icon>
                    <div slot="label-name">
                        <span>FILE_NAME.xlsx</span>
                    </div>
                    <ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-postfix"
                        size="xs"
                    ></ssk-icon>
                    <div slot="footer">
                        <ssk-progress-bar
                            label="Completed"
                            size="sm"
                            status="success"
                            value="100"
                            styleOfProgress="text"
                        ></ssk-progress-bar>
                    </div>
                </ssk-download-file>

                <ssk-download-file  ${spread(args)}
                    ><ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-prefix"
                    ></ssk-icon>
                    <div slot="label-name">
                        <span>FILE_NAME.xlsx</span>
                    </div>
                    <ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-postfix"
                        size="xs"
                    ></ssk-icon>
                    <div slot="footer">
                        <ssk-progress-bar
                            label="Download fail"
                            size="sm"
                            status="error"
                            value="50"
                            styleOfProgress="icon"
                        ></ssk-progress-bar>
                    </div>
                </ssk-download-file>

                <ssk-download-file  ${spread(args)}
                    ><ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-prefix"
                    ></ssk-icon>
                    <div slot="label-name">
                        <span>FILE_NAME.xlsx</span>
                    </div>
                    <ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-postfix"
                        size="xs"
                    ></ssk-icon>
                    <div slot="footer">
                        <ssk-progress-bar
                            label="Download fail"
                            size="sm"
                            status="error"
                            value="72"
                            styleOfProgress="icon"
                        ></ssk-progress-bar>
                    </div>
                </ssk-download-file>

                <ssk-download-file  ${spread(args)}
                    ><ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-prefix"
                    ></ssk-icon>
                    <div slot="label-name">
                        <span>FILE_NAME.xlsx</span>
                    </div>
                    <ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-postfix"
                        size="xs"
                    ></ssk-icon>
                    <div slot="footer">
                        <ssk-progress-bar
                            label="Download fail"
                            size="sm"
                            status="error"
                            value="89"
                            styleOfProgress="text"
                        ></ssk-progress-bar>
                    </div>
                </ssk-download-file>
            </div>
            <div class="sm" style="display: flex; flex-direction: column; justify-content: space-between; align-items: center;">
            <ssk-text size="lg">
                        ---------------------{ Download File size lg }---------------------
            </ssk-text>
                <ssk-download-file size="lg" ${spread(args)}
                    ><ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-prefix"
                    ></ssk-icon>
                    <div slot="label-name">
                        <span>file name.xlsx</span>
                    </div>
                    <ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-postfix"
                        size="md"
                    ></ssk-icon>
                    <div slot="footer">
                        <ssk-progress-bar
                            label="Loading Data..."
                            size="sm"
                            status="in-progress"
                            value="0"
                        ></ssk-progress-bar>
                    </div>
                </ssk-download-file>

                <ssk-download-file size="lg" ${spread(args)}
                    ><ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-prefix"
                    ></ssk-icon>
                    <div slot="label-name">
                        <span>file name.xlsx</span>
                    </div>
                    <ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-postfix"
                        size="md"
                    ></ssk-icon>
                    <div slot="footer">
                        <ssk-progress-bar
                            label="Loading Data..."
                            size="sm"
                            status="in-progress"
                            value="30"
                        ></ssk-progress-bar>
                    </div>
                </ssk-download-file>

                <ssk-download-file size="lg" ${spread(args)}
                    ><ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-prefix"
                    ></ssk-icon>
                    <div slot="label-name">
                        <span>file name.xlsx</span>
                    </div>
                    <ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-postfix"
                        size="md"
                    ></ssk-icon>
                    <div slot="footer">
                        <ssk-progress-bar
                            label="Loading Data..."
                            size="sm"
                            status="in-progress"
                            value="50"
                        ></ssk-progress-bar>
                    </div>
                </ssk-download-file>

                <ssk-download-file size="lg" ${spread(args)}
                    ><ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-prefix"
                    ></ssk-icon>
                    <div slot="label-name">
                        <span>FILE_NAME.xlsx</span>
                    </div>
                    <ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-postfix"
                        size="md"
                    ></ssk-icon>
                    <div slot="footer">
                        <ssk-progress-bar
                            label="Loading Data..."
                            size="sm"
                            status="in-progress"
                            value="70"
                        ></ssk-progress-bar>
                    </div>
                </ssk-download-file>

                <ssk-download-file size="lg" ${spread(args)}
                    ><ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-prefix"
                    ></ssk-icon>
                    <div slot="label-name">
                        <span>file name.xlsx</span>
                    </div>
                    <ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-postfix"
                        size="md"
                    ></ssk-icon>
                    <div slot="footer">
                        <ssk-progress-bar
                            label="Loading Data..."
                            size="sm"
                            status="in-progress"
                            value="90"
                        ></ssk-progress-bar>
                    </div>
                </ssk-download-file>

                <ssk-download-file size="lg" ${spread(args)}
                    ><ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-prefix"
                    ></ssk-icon>
                    <div slot="label-name">
                        <span>file name.xlsx</span>
                    </div>
                    <ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-postfix"
                        size="md"
                    ></ssk-icon>
                    <div slot="footer">
                        <ssk-progress-bar
                            label="Loading Data..."
                            size="sm"
                            status="in-progress"
                            value="100"
                        ></ssk-progress-bar>
                    </div>
                </ssk-download-file>

                <ssk-download-file size="lg" ${spread(args)}
                    ><ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-prefix"
                    ></ssk-icon>
                    <div slot="label-name">
                        <span>file name.xlsx</span>
                    </div>
                    <ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-postfix"
                        size="md"
                    ></ssk-icon>
                    <div slot="footer">
                        <ssk-progress-bar
                            label="Completed"
                            size="sm"
                            status="success"
                            value="100"
                            styleOfProgress="icon"
                        ></ssk-progress-bar>
                    </div>
                </ssk-download-file>

                <ssk-download-file size="lg" ${spread(args)}
                    ><ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-prefix"
                    ></ssk-icon>
                    <div slot="label-name">
                        <span>file name.xlsx</span>
                    </div>
                    <ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-postfix"
                        size="md"
                    ></ssk-icon>
                    <div slot="footer">
                        <ssk-progress-bar
                            label="Loading Data..."
                            size="sm"
                            status="success"
                            value="100"
                            styleOfProgress="text"
                        ></ssk-progress-bar>
                    </div>
                </ssk-download-file>

                <ssk-download-file size="lg" ${spread(args)}
                    ><ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-prefix"
                    ></ssk-icon>
                    <div slot="label-name">
                        <span>file name.xlsx</span>
                    </div>
                    <ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-postfix"
                        size="md"
                    ></ssk-icon>
                    <div slot="footer">
                        <ssk-progress-bar
                            label="Download fail"
                            size="sm"
                            status="error"
                            value="50"
                            styleOfProgress="icon"
                        ></ssk-progress-bar>
                    </div>
                </ssk-download-file>

                <ssk-download-file size="lg" ${spread(args)}
                    ><ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-prefix"
                    ></ssk-icon>
                    <div slot="label-name">
                        <span>file name.xlsx</span>
                    </div>
                    <ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-postfix"
                        size="md"
                    ></ssk-icon>
                    <div slot="footer">
                        <ssk-progress-bar
                            label="Download fail"
                            size="sm"
                            status="error"
                            value="72"
                            styleOfProgress="icon"
                        ></ssk-progress-bar>
                    </div>
                </ssk-download-file>

                <ssk-download-file size="lg" ${spread(args)}
                    ><ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-prefix"
                    ></ssk-icon>
                    <div slot="label-name">
                        <span>file name.xlsx</span>
                    </div>
                    <ssk-icon
                        name="outline-ellipsis-horizontal-circle"
                        slot="icon-slot-postfix"
                        size="md"
                    ></ssk-icon>
                    <div slot="footer">
                        <ssk-progress-bar
                            label="Download fail"
                            size="sm"
                            status="error"
                            value="89"
                            styleOfProgress="text"
                        ></ssk-progress-bar>
                    </div>
                </ssk-download-file>
            </div>
        </div>
        `;
    },
    argTypes: {
        size: {
            options: ['md', 'lg'],
            control: { type: 'select' },
            description: 'Size of the downloaded file'
        },
        "?hideCloseButton": {
            description: "Hide button top close",
            control: "boolean",
            table: {
                category: "Props",
            },
        },
    },
};

export default meta;

type Story = StoryObj<DownloadFileWithLabel>;

export const ShowCase: Story = {
    args: {
    },
    parameters: {
        design: {
            type: "figma",
            url: "https://www.figma.com/design/xKpB9x2tcu5FzWx25cQRJe/Design-System-SSK?node-id=15545-18216&m=dev",
        },
    },
};
