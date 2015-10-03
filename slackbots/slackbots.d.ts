// Type definitions for slackbots
// Project: https://github.com/mishk0/slack-bot-api
// Definitions by: Lewis Hopkins https://github.com/lulzhipsters
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../promises-a-plus/promises-a-plus.d.ts" />

declare module "slackbots" {

	function SlackBot(params: SlackBot.BotOptions): SlackBot.Bot;

	module SlackBot {
		type unixtimestamp = number;
		type uri = string;

		interface Bot {
			/**
			 * Starts a Real Time Messaging API session
			 */
			login(): void;

			/**
			 * Establish a WebSocket connection
			 */
			connect(): void;

			/**
			 * Get channels
			 * @returns {vow.Promise}
			 */
			getChannels(): PromisesAPlus.Thenable<SlackBot.ChannelList>;

			/**
			 * Get channel by name
			 * @param {string} name
			 * @returns {object}
			 */
			getChannel(name: string): PromisesAPlus.Thenable<SlackBot.Channel>;

			/**
			 * Get channel ID
			 * @param {string} name
			 * @returns {string}
			 */
			getChannelId(name: string): PromisesAPlus.Thenable<string>;

			/**
			 * Get users
			 * @returns {vow.Promise}
			 */
			getUsers(): PromisesAPlus.Thenable<SlackBot.UserList>;

			/**
			 * Get user by name
			 * @param {string} name
			 * @returns {object}
			 */
			getUser(name: string): PromisesAPlus.Thenable<SlackBot.User>;

			/**
			 * Get groups
			 * @returns {vow.Promise}
			 */
			getGroups(): PromisesAPlus.Thenable<SlackBot.GroupList>;

			/**
			 * Get group by name
			 * @param {string} name
			 * @returns {object}
			 */
			getGroup(name: string): PromisesAPlus.Thenable<SlackBot.Group>;

			/**
			 * Get group ID
			 * @param {string} name
			 * @returns {string}
			 */
			getGroupId(name: string): PromisesAPlus.Thenable<string>;

			/**
			 * Get "direct message" channel ID
			 * @param {string} name
			 * @returns {vow.Promise}
			 */
			getChatId(name: string): PromisesAPlus.Thenable<string>;

			/**
			 * Opens a "direct message" channel with another member of your Slack team
			 * @param {string} userId
			 * @returns {vow.Promise}
			 */
			//undocumented
			//openIm(userId: string): any;

			/**
			 * Posts a message to a channel by ID
			 * @param {string} id - channel ID
			 * @param {string} text
			 * @param {object} params
			 * @returns {vow.Promise}
			 */
			postMessage(id: string, text: string, params?: PostParams): PromisesAPlus.Thenable<PostResponse>;

			/**
			 * Posts a message to user by name
			 * @param {string} name
			 * @param {string} text
			 * @param {object} params
			 * @param {function} cb
			 * @returns {vow.Promise}
			 */
			postMessageToUser(name: string, text: string, params?: PostParams, callback?: Function): PromisesAPlus.Thenable<PostResponse>;

			/**
			 * Posts a message to channel by name
			 * @param {string} name
			 * @param {string} text
			 * @param {object} params
			 * @param {function} cb
			 * @returns {vow.Promise}
			 */
			postMessageToChannel(name: string, text: string, params?: PostParams, callback?: Function): PromisesAPlus.Thenable<PostResponse>;

			/**
			 * Posts a message to group by name
			 * @param {string} name
			 * @param {string} text
			 * @param {object} params
			 * @param {function} cb
			 * @returns {vow.Promise}
			 */
			postMessageToGroup(name: string, text: string, params?: PostParams, callback?: Function): PromisesAPlus.Thenable<PostResponse>;

			/**
			 * Posts a message to group | channel | user
			 * @param {string} name
			 * @param {string} text
			 * @param {object} params
			 * @param {function} cb
			 * @returns {vow.Promise}
			 */
			postTo(name: string, text: string, params?: PostParams, callback?: Function): PromisesAPlus.Thenable<PostResponse>;


		}

		interface Attachment {
			fallback: string;

            color?: string; //hex color or (good | warning | danger)

            pretext?: string;

            author_name?: string;
            author_link?: string;
            author_icon?: string;

            title: string;
            title_link?: uri;

            text?: string;

            fields?: Array<Field>;

            image_url?: uri;
            thumb_url?: uri;
		}

		interface Field {
			title: string;
			value: string;
			short?: boolean;
		}

		interface PostParams {
			as_user?: boolean;
			parse?: string; //full or none
			link_names?: number;
			attachments?: Array<Attachment>;
			unfurl_links?: boolean;
			unfurl_media?: boolean;
			icon_url?: uri;
			icon_emoji?: string;
		}

		interface PostResponse {
			ok: boolean;
			ts: unixtimestamp;
			channel: string;
			message: Message;
		}

		interface BotOptions {
			token: string;
			name: string;
		}

		interface ChannelList {
			ok: boolean;
			channels: Array<Channel>;
		}

		interface Channel {
			id: string;
			name: string;
			is_channel: boolean;
			created: unixtimestamp;//unix timestamp
			creator: string;
			is_archived: boolean;
			is_general: boolean;

			members: Array<string>; //users by Id

			topic: Property;

			purpose: Property;

			is_member: boolean;

			last_read: unixtimestamp;
			latest: Message;
			unread_count: number;
			unread_count_display: number;
		}

		interface UserList {
			ok: boolean;
			members: Array<User>;
		}

		interface User {
			id: string;
			name: string;
			deleted: boolean;
			color: string;
			profile: UserProfile;

			is_admin: boolean;
			is_owner: boolean;
			is_primary_owner: boolean;
			is_restricted: boolean;
			is_ultra_restricted: boolean;

			has_2fa: boolean;
			two_factor_type: string;//app or sms

			has_files: boolean;
		}

		interface UserProfile {
			first_name?: string;
			last_name?: string;
			real_name?: string;

			email?: string;
			skype?: string;
			phone?: string;

			image_24: uri;
			image_32: uri;
			image_48: uri;
			image_72: uri;
			image_192: uri;
		}

		interface GroupList {
			ok: boolean;

		}

		interface Group {
			id: string;
			name: string;
			is_group: boolean;
			created: unixtimestamp;
			creator: string;
			is_archived: boolean;
			members: Array<string>; //user Ids
			topic: Property;
			purpose: Property;

			last_read: unixtimestamp;
			latest: Message;
			unread_count: number;
			unread_count_display: number;
		}

		interface Property {
			value: string;
			creator: string;
			last_set: number; //unix timestamp
		}

		interface Event {
			type: string;
			channel: string;
			user: string;
			ts: number;
		}

		interface Message extends Event {
			subtype: string;
			text: string;
		}

	}

	export = SlackBot;
}