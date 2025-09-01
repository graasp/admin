## Setting up the server

> [WARNING]
> Deprecated documentation. We do not use kamal to deploy the app.
> This app is deployed using ECS with the docker image built from the Dockerfile in the root of the repository.

The following instructions are based on [Kamal's missing tutorial for Ruby on Rails](https://rameerez.com/kamal-tutorial-how-to-deploy-a-postgresql-rails-app/)
Where the author gives interesting insights into how to setup your server with tools like `uf2` (firewall), `fail2ban` (spam and attack protection via jails) and apparmor.
Copy the hardening script to the server:

```sh
scp -i <your-ssh-key> scripts/hardening.sh ubuntu@<your-ip>:~/hardening.sh
```

SSH into the server:

```sh
ssh -i <your-ssh-key> ubuntu@<your-ip>
```

Make the script executable and run it (as root):

```sh
chmod +x hardening.sh
sudo ./hardening.sh
```

## Email delivery setup

For email delivery we use [Swoosh](https://hexdocs.pm/swoosh/Swoosh.html#module-installation) with the [AmazoneSES Adapter](https://hexdocs.pm/swoosh/Swoosh.Adapters.AmazonSES.html).

The configuration requires providing the `access_key` and `secret` of a user that has access to the ses:SendEmail and ses:SendRawEmail actions.

Below is an inline policy that you can use to allow these actions for a user. Ensure that that user does not have other permissions and stick to the least priviledge principle.

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "VisualEditor0",
      "Effect": "Allow",
      "Action": ["ses:SendEmail", "ses:SendRawEmail"],
      "Resource": "*"
    }
  ]
}
```

You can restict the resource to be more specific.

Once the user is created, create an access key pair. Set them as `MAILER_SES_ACCESS_KEY` and `MAILER_SES_SECRET` respectively.
