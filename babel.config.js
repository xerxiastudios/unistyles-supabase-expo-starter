module.exports = function (api) {
	api.cache(true);
	return {
		presets: ["babel-preset-expo"],
		plugins: [
			require.resolve("expo-router/babel"),
			[
				"module-resolver",
				{
					root: ["./"],
					alias: {
						"@": "./src",
					},
				},
			],
			"react-native-reanimated/plugin",
		],
	};
};
