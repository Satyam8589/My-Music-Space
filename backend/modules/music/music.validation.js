import Joi from "joi";

export const createMoodSpaceValidation = {
    body: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required()
    })
};

export const addSongToMoodSpaceValidation = {
    body: Joi.object({
        videoId: Joi.string().required(),
        title: Joi.string().required(),
        thumbnail: Joi.string().required(),
        channelTitle: Joi.string().required(),
        mode: Joi.string().required()
    })
};