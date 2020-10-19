import { regMapService } from '../services';

export const regMapController = {
  async post(req, res) {
    const kingdomId = req.params.kingdomId;
    try {
      const kingdomData = await regMapService.postRegMap(kingdomId);
      res.status(200).json({ kingdomData });
    } catch (error) {
      res.status(500).json({error: 'Something went wrong...'});
    }
  },
};
