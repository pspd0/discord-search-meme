import { SlashCommandBuilder, CommandInteraction, Client, EmbedBuilder } from "discord.js";
import { apikey } from "../config.json"
import axios from "axios";

module.exports = {
    data: new SlashCommandBuilder()
        .setName("gif")
        .setDescription("짤을 검색해서 보여준다.")
        .addStringOption(option => option.setName("search")
            .setDescription("짤을 검색해주세요.")
            .setRequired(true)),
    async execute(interaction: CommandInteraction, client: Client) {
        const gif : any = interaction.options.get('search');

        const embed = new EmbedBuilder()
            .setTitle("Gif")
            .setTimestamp()

        await axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${apikey}&tag=${gif.value}&rating=pg-13`, {
            headers: {
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.5112.102 Safari/537.36'
            },
        }).then(async(res) => {
            embed.setImage(`https://media2.giphy.com/media/${res.data.data.id}/200.${res.data.data.type}`);
            embed.setColor("Green");
            await interaction.reply({embeds: [embed]});
        }).catch(async(e) => {
            embed.setDescription(`${String(e)}`);
            embed.setColor("Red");
            await interaction.reply({embeds: [embed]});
        });
    }
};