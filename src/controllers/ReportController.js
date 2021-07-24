const { Op } = require('sequelize');
const User = require('./../models/User');

module.exports = {

    async show(req, res) {
        const { user_id } = req.params;

        const users = await User.findAll({
            attributes: ['name', 'email'],
            where: {
                email: {
                    [Op.like]: '%@gmail.com'
                }
            },
            include: [
                { association: 'addresses', where: { street: 'machadinho' } },
                {
                    association: 'techs',
                    required: false,
                    where: {
                        name: {
                            [Op.like]: 'Node%'
                        }

                    }
                }
            ]
        })

        return res.json(users);
    },

}